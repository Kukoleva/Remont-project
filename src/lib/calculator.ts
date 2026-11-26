import prices from './prices.json';
import materialsData from './materials.json';
import type {
  CalculatorInput,
  CalculatorResult,
  MaterialEstimate,
  WorkEstimate,
  MaterialClass,
} from '@/types/calculator';

/* ─────────────────────────────────────────────────────────────
   Расчётный движок калькулятора ремонта.
   Логика материалов — по ТЗ:
     • Обои: (периметр × высота − проёмы) / площадь рулона × запас 10%
     • Плитка: площадь × 1.1
     • Ламинат: площадь × 1.05
     • Краска: площадь × расход (л/м²) × слои
     • Стяжка / штукатурка / гипсокартон — по нормативам (кг/м², листов)
   ───────────────────────────────────────────────────────────── */

const ROLL_AREA = 5.3; // стандартный рулон 1.06 × 5 м
const PAINT_CONSUMPTION = 0.1; // л/м² на один слой
const PAINT_LAYERS = 2;
const OPENINGS_FACTOR = 0.85; // вычитаем ~15% на окна/двери

const MATERIAL_BY_SLUG: Record<string, { name: string; unit: string; unitAreaM2: number }> =
  Object.fromEntries(
    materialsData.materials.map((m) => [m.slug, { name: m.name, unit: m.unit, unitAreaM2: m.unitAreaM2 }]),
  );

/** Приближённый периметр помещения по площади (модель квадратной комнаты) */
function perimeterOf(area: number): number {
  return 4 * Math.sqrt(area);
}

/** Площадь стен помещения = периметр × высота */
function wallAreaOf(area: number, ceilingHeight: number): number {
  return perimeterOf(area) * ceilingHeight;
}

/** Площадь санузла (м²) в зависимости от планировки */
function bathroomArea(bathroom: CalculatorInput['bathroom']): number {
  return bathroom === 'sovmeshchenny' ? 5 : 6.5;
}

/** Приближённая площадь кухни (м²) — ~15% квартиры, минимум 6 м² */
function kitchenArea(area: number): number {
  return Math.max(6, area * 0.15);
}

/** Расчёт черновых материалов и отделки по введённым параметрам */
export function calculateEstimate(input: CalculatorInput): CalculatorResult {
  const { area, rooms, bathroom, ceilingHeight, renovationType, materialClass, works } = input;

  const workMeta = prices.renovationTypes[renovationType] ?? prices.renovationTypes.kapitalnyj;
  const classMeta = prices.materialClasses[materialClass] ?? prices.materialClasses.standard;
  const workMultiplier = workMeta.workMultiplier * classMeta.workMultiplier;

  const bath = bathroomArea(bathroom);
  const kitchen = kitchenArea(area);
  const livingArea = Math.max(1, area - bath - kitchen);
  const wallsRooms = wallAreaOf(livingArea, ceilingHeight);
  const wallsBath = wallAreaOf(bath, ceilingHeight);

  const materials: MaterialEstimate[] = [];
  const pushMaterial = (slug: string, amount: number, note?: string) => {
    const meta = MATERIAL_BY_SLUG[slug];
    const item = materialsData.materials.find((m) => m.slug === slug);
    const pricePerUnit = (item?.prices as Record<MaterialClass, number>)[materialClass];
    materials.push({
      slug,
      name: meta.name,
      amount: Math.ceil(amount),
      unit: meta.unit,
      unitPrice: pricePerUnit,
      total: Math.ceil(amount) * pricePerUnit,
      note,
    });
  };

  // 1. Обои (только жилые комнаты) — по формуле ТЗ
  const netWallpaperArea = wallsRooms * OPENINGS_FACTOR;
  pushMaterial('oboi', (netWallpaperArea / ROLL_AREA) * 1.1, '+10% на подгонку рисунка');

  // 2. Плитка: стены санузла + кухонный фартук и полы — ×1.1
  pushMaterial('plitka-sten', (wallsBath + kitchen * 1.5) * 1.1);
  pushMaterial('plitka-pol', (bath + kitchen) * 1.1);

  // 3. Ламинат — жилая площадь × 1.05
  pushMaterial('laminat', livingArea * 1.05, '+5% на подрезку');

  // 4. Краска — стены × расход × слои (потолки натяжные)
  pushMaterial('kraska', wallsRooms * PAINT_CONSUMPTION * PAINT_LAYERS, '2 слоя');

  // 5. Стяжка пола — сухая смесь (~18 кг/м², слой 30–50 мм → мешков 25 кг)
  pushMaterial('styazhka', area * 1.4, 'слой 30–50 мм');

  // 6. Штукатурка — ~12 кг/м² → мешков 30 кг
  pushMaterial('shtukaturka', wallsRooms * 0.4, 'выравнивание под маяк');

  // 7. Гипсокартон — только при капитальном/евро ремонте
  if (renovationType !== 'kosmeticheskij') {
    pushMaterial('gipsokarton', area * 0.35, 'потолки, ниши');
  }

  // 8. Расчёт стоимости работ по выбранным видам
  const workEstimates: WorkEstimate[] = [];
  const electricityPoints = rooms * 8 + 10; // ~8 точек на комнату + санузел/кухня
  const plumbingPoints = rooms * 3 + 6;

  for (const w of prices.works) {
    if (!works.includes(w.slug)) continue;

    let quantity = 0;
    switch (w.slug) {
      case 'demontazh': quantity = area; break;
      case 'elektrika': quantity = electricityPoints; break;
      case 'santehnika': quantity = plumbingPoints; break;
      case 'shtukaturka': quantity = wallsRooms; break;
      case 'styazhka': quantity = livingArea; break;
      case 'gipsokarton': quantity = area * 0.35; break;
      case 'plitka': quantity = (wallsBath + kitchen * 1.5) * 1.1 + (bath + kitchen) * 1.1; break;
      case 'oboi': quantity = wallsRooms; break;
      case 'pokraska': quantity = wallsRooms; break;
      case 'laminat': quantity = livingArea; break;
      case 'potolki': quantity = area; break;
      case 'dveri': quantity = rooms + 2; break;
    }

    if (quantity <= 0) continue;
    workEstimates.push({
      slug: w.slug,
      name: w.name,
      unit: w.unit as WorkEstimate['unit'],
      quantity: Math.round(quantity * 10) / 10,
      pricePerUnit: Math.round(w.price * workMultiplier),
      total: Math.round(quantity * w.price * workMultiplier),
    });
  }

  const materialsTotal = materials.reduce((s, m) => s + m.total, 0);
  const worksTotal = workEstimates.reduce((s, w) => s + w.total, 0);
  const grandTotal = materialsTotal + worksTotal;

  // Срок: базовый по типу + поправка на площадь и дизайн-проект
  const durationDays = workMeta.duration + Math.round(area / 20) * 3 + (input.designProject ? 10 : 0);

  return {
    materials,
    works: workEstimates,
    materialsTotal,
    worksTotal,
    grandTotal,
    durationDays,
    currency: 'BYN',
  };
}

/** Форматирование суммы в белорусских рублях */
export function formatBYN(value: number): string {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' BYN';
}

/** Сборка текста сметы для отправки в WhatsApp/Telegram */
export function buildEstimateMessage(input: CalculatorInput, result: CalculatorResult): string {
  const typeLabel = prices.renovationTypes[input.renovationType].label;
  const classLabel = prices.materialClasses[input.materialClass].label;

  const lines: string[] = [
    '🧮 *Смета на ремонт — Ремонт Квартир*',
    '📍 Город: Минск / Гомель',
    `🏠 Площадь: ${input.area} м² · ${input.rooms} комн.`,
    `🔧 Тип: ${typeLabel} · Материалы: ${classLabel}`,
    '',
    '*Материалы:*',
    ...result.materials.map((m) => `• ${m.name}: ${m.amount} ${m.unit} — ${formatBYN(m.total)}`),
    '',
    '*Работы:*',
    ...result.works.map((w) => `• ${w.name}: ${w.quantity} ${w.unit} — ${formatBYN(w.total)}`),
    '',
    `💰 *Итого: ${formatBYN(result.grandTotal)}*`,
    `⏱ Срок: ~${result.durationDays} раб. дней`,
    '',
    'Оставьте телефон — закрепим цену и подготовим договор 👇',
  ];

  return lines.join('\n');
}
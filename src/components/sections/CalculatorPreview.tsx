'use client';

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { calculateEstimate, formatBYN } from '@/lib/calculator';
import type { RenovationType, MaterialClass } from '@/types/calculator';

const TYPES: { value: RenovationType; label: string }[] = [
  { value: 'kosmeticheskij', label: 'Косметический' },
  { value: 'kapitalnyj', label: 'Капитальный' },
  { value: 'evro', label: 'Евро / дизайнерский' },
];

const CLASSES: { value: MaterialClass; label: string }[] = [
  { value: 'econom', label: 'Эконом' },
  { value: 'standard', label: 'Стандарт' },
  { value: 'premium', label: 'Премиум' },
];

const DEFAULT_WORKS = ['demontazh', 'elektrika', 'santehnika', 'shtukaturka', 'styazhka', 'plitka', 'oboi', 'pokraska', 'laminat', 'potolki', 'dveri'];

/** Превью калькулятора: мгновенная оценка стоимости по площади и типу */
export default function CalculatorPreview() {
  const [area, setArea] = useState(54);
  const [type, setType] = useState<RenovationType>('kapitalnyj');
  const [materialClass, setMaterialClass] = useState<MaterialClass>('standard');

  const estimate = useMemo(
    () =>
      calculateEstimate({
        area,
        rooms: 2,
        bathroom: 'sovmeshchenny',
        ceilingHeight: 2.7,
        renovationType: type,
        materialClass,
        designProject: false,
        works: DEFAULT_WORKS,
      }),
    [area, type, materialClass],
  );

  return (
    <section className="section-pad bg-gradient-primary text-white">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            Онлайн-калькулятор
          </p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Узнайте стоимость ремонта за 2 минуты
          </h2>
          <p className="mt-4 max-w-lg text-white/80">
            Точная предварительная смета: материалы, работы и сроки. Пришлите её себе
            в WhatsApp или Telegram и закрепите цену.
          </p>
          <div className="mt-6 rounded-card bg-white/95 p-5 text-ink shadow-lift">
            <p className="text-xs font-medium text-muted">Примерная стоимость под ключ</p>
            <p className="mt-1 font-heading text-3xl font-extrabold text-primary">
              {formatBYN(estimate.grandTotal)}
            </p>
            <p className="mt-1 text-sm text-muted">
              Материалы + работы, срок ~{estimate.durationDays} раб. дней
            </p>
          </div>
          <Button href="/kalkulyator" size="lg" className="mt-6">
            Открыть полный калькулятор <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Мини-форма */}
        <div className="rounded-card-lg bg-white p-6 text-ink shadow-lift md:p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="preview-area" className="mb-2 flex justify-between text-sm font-medium">
                <span>Площадь квартиры</span>
                <span className="font-bold text-primary">{area} м²</span>
              </label>
              <input
                id="preview-area"
                type="range"
                min={20}
                max={200}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-[#0F7B4E]"
                aria-label="Площадь квартиры"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Тип ремонта</p>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    aria-pressed={type === t.value}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      type === t.value ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Класс материалов</p>
              <div className="flex flex-wrap gap-2">
                {CLASSES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setMaterialClass(c.value)}
                    aria-pressed={materialClass === c.value}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      materialClass === c.value ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
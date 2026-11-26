/** Типы калькулятора ремонта */

export type RenovationType = 'kosmeticheskij' | 'kapitalnyj' | 'evro';

export type MaterialClass = 'econom' | 'standard' | 'premium';

/** Санузел: совмещённый или раздельный влияет на расчёт плитки */
export type BathroomType = 'sovmeshchenny' | 'razdelny';

export type CalculatorInput = {
  /** общая площадь квартиры, м² */
  area: number;
  /** количество комнат */
  rooms: number;
  /** тип санузла */
  bathroom: BathroomType;
  /** высота потолков, м */
  ceilingHeight: number;
  /** тип ремонта */
  renovationType: RenovationType;
  /** класс материалов */
  materialClass: MaterialClass;
  /** нужен дизайн-проект */
  designProject: boolean;
  /** включённые виды работ (slugs) */
  works: string[];
};

export type MaterialEstimate = {
  slug: string;
  name: string;
  /** расчётное количество */
  amount: number;
  unit: string;
  /** цена за единицу по классу */
  unitPrice: number;
  total: number;
  note?: string;
};

export type WorkEstimate = {
  slug: string;
  name: string;
  unit: 'м2' | 'шт' | 'компл';
  quantity: number;
  pricePerUnit: number;
  total: number;
};

export type CalculatorResult = {
  materials: MaterialEstimate[];
  works: WorkEstimate[];
  materialsTotal: number;
  worksTotal: number;
  grandTotal: number;
  /** срок в рабочих днях */
  durationDays: number;
  /** рекомендуемая валюта и округление */
  currency: 'BYN';
};

export type CalculatorStepKey = 'rooms' | 'materials' | 'works' | 'result';
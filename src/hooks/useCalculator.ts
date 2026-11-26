'use client';

import { useMemo, useState } from 'react';
import { calculateEstimate } from '@/lib/calculator';
import type { CalculatorInput, CalculatorResult } from '@/types/calculator';

/** Значения по умолчанию — типовая 2-комнатная квартира 54 м² */
const DEFAULT_INPUT: CalculatorInput = {
  area: 54,
  rooms: 2,
  bathroom: 'sovmeshchenny',
  ceilingHeight: 2.7,
  renovationType: 'kapitalnyj',
  materialClass: 'standard',
  designProject: false,
  works: [
    'demontazh',
    'elektrika',
    'santehnika',
    'shtukaturka',
    'styazhka',
    'plitka',
    'oboi',
    'pokraska',
    'laminat',
    'potolki',
    'dveri',
  ],
};

/** Хук состояния калькулятора + мемоизированный расчёт сметы */
export function useCalculator() {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);

  const update = (patch: Partial<CalculatorInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  const toggleWork = (slug: string) =>
    setInput((prev) => ({
      ...prev,
      works: prev.works.includes(slug)
        ? prev.works.filter((w) => w !== slug)
        : [...prev.works, slug],
    }));

  const result: CalculatorResult = useMemo(() => calculateEstimate(input), [input]);

  const reset = () => setInput(DEFAULT_INPUT);

  return { input, update, toggleWork, result, reset };
}
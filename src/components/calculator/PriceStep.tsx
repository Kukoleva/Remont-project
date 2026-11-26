'use client';

import { cn } from '@/lib/cn';
import { formatBYN } from '@/lib/calculator';
import prices from '@/lib/prices.json';
import type { CalculatorInput } from '@/types/calculator';

type Props = {
  input: CalculatorInput;
  toggleWork: (slug: string) => void;
};

/** Шаг 3: выбор видов работ из прайса */
export default function PriceStep({ input, toggleWork }: Props) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-ink">
        Выберите работы (по прайсу, BYN):
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {prices.works.map((w) => {
          const active = input.works.includes(w.slug);
          return (
            <button
              key={w.slug}
              onClick={() => toggleWork(w.slug)}
              aria-pressed={active}
              className={cn(
                'flex items-center justify-between gap-3 rounded-card border p-3 text-left transition',
                active ? 'border-primary bg-mint/60' : 'border-mint bg-light hover:bg-mint/40',
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded border',
                    active ? 'border-primary bg-primary text-white' : 'border-muted/40 bg-white',
                  )}
                  aria-hidden
                >
                  {active && '✓'}
                </span>
                <span className="text-sm font-medium text-ink">{w.name}</span>
              </div>
              <span className="text-xs text-muted">
                {w.price} {w.unit && `/ ${w.unit}`}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted">
        Итоговая цена работ рассчитывается с учётом типа ремонта и класса материалов.
        Итого вы увидите на следующем шаге.
      </p>
    </div>
  );
}
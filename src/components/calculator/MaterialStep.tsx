'use client';

import { cn } from '@/lib/cn';
import prices from '@/lib/prices.json';
import type { CalculatorInput } from '@/types/calculator';

type Props = {
  input: CalculatorInput;
  update: (patch: Partial<CalculatorInput>) => void;
};

const TYPES = Object.entries(prices.renovationTypes).map(([value, meta]) => ({
  value: value as CalculatorInput['renovationType'],
  label: meta.label,
  duration: meta.duration,
}));

const CLASSES = Object.entries(prices.materialClasses).map(([value, meta]) => ({
  value: value as CalculatorInput['materialClass'],
  label: meta.label,
}));

/** Шаг 2: тип ремонта, класс материалов, дизайн-проект */
export default function MaterialStep({ input, update }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Тип ремонта</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => update({ renovationType: t.value })}
              aria-pressed={input.renovationType === t.value}
              className={cn(
                'rounded-card border p-4 text-left transition',
                input.renovationType === t.value
                  ? 'border-primary bg-primary text-white shadow-card'
                  : 'border-mint bg-light text-ink hover:bg-mint',
              )}
            >
              <span className="block font-semibold">{t.label}</span>
              <span className={cn('mt-1 block text-xs', input.renovationType === t.value ? 'text-white/80' : 'text-muted')}>
                от ~{t.duration} дней
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Класс материалов</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {CLASSES.map((c) => (
            <button
              key={c.value}
              onClick={() => update({ materialClass: c.value })}
              aria-pressed={input.materialClass === c.value}
              className={cn(
                'rounded-card border p-4 text-left font-semibold transition',
                input.materialClass === c.value
                  ? 'border-primary bg-primary text-white shadow-card'
                  : 'border-mint bg-light text-ink hover:bg-mint',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-card border border-mint bg-light p-4">
        <input
          type="checkbox"
          checked={input.designProject}
          onChange={(e) => update({ designProject: e.target.checked })}
          className="h-5 w-5 accent-[#0F7B4E]"
        />
        <div>
          <span className="block font-semibold text-ink">Нужен дизайн-проект (+10 дней к сроку)</span>
          <span className="text-sm text-muted">3D-визуализация, планировка и смета комплектации</span>
        </div>
      </label>
    </div>
  );
}
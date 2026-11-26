'use client';

import { cn } from '@/lib/cn';
import type { CalculatorInput, BathroomType } from '@/types/calculator';

type Props = {
  input: CalculatorInput;
  update: (patch: Partial<CalculatorInput>) => void;
};

const ROOMS = [1, 2, 3, 4];
const HEIGHTS = [2.5, 2.7, 3.0];

const BATHROOMS: { value: BathroomType; label: string }[] = [
  { value: 'sovmeshchenny', label: 'Совмещённый' },
  { value: 'razdelny', label: 'Раздельный' },
];

/** Шаг 1: площадь, комнаты, санузел, потолки */
export default function RoomStep({ input, update }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <label className="mb-3 flex items-center justify-between text-sm font-semibold text-ink">
          <span>Общая площадь квартиры</span>
          <span className="rounded-full bg-mint px-3 py-1 text-primary">{input.area} м²</span>
        </label>
        <input
          type="range"
          min={20}
          max={200}
          step={1}
          value={input.area}
          onChange={(e) => update({ area: Number(e.target.value) })}
          className="w-full accent-[#0F7B4E]"
          aria-label="Площадь квартиры в квадратных метрах"
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Количество комнат</p>
        <div className="grid grid-cols-4 gap-3">
          {ROOMS.map((r) => (
            <button
              key={r}
              onClick={() => update({ rooms: r })}
              aria-pressed={input.rooms === r}
              className={cn(
                'rounded-card border py-3 font-semibold transition',
                input.rooms === r
                  ? 'border-primary bg-primary text-white shadow-card'
                  : 'border-mint bg-light text-ink hover:bg-mint',
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Санузел</p>
        <div className="grid grid-cols-2 gap-3">
          {BATHROOMS.map((b) => (
            <button
              key={b.value}
              onClick={() => update({ bathroom: b.value })}
              aria-pressed={input.bathroom === b.value}
              className={cn(
                'rounded-card border py-3 font-semibold transition',
                input.bathroom === b.value
                  ? 'border-primary bg-primary text-white shadow-card'
                  : 'border-mint bg-light text-ink hover:bg-mint',
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Высота потолков</p>
        <div className="grid grid-cols-3 gap-3">
          {HEIGHTS.map((h) => (
            <button
              key={h}
              onClick={() => update({ ceilingHeight: h })}
              aria-pressed={input.ceilingHeight === h}
              className={cn(
                'rounded-card border py-3 font-semibold transition',
                input.ceilingHeight === h
                  ? 'border-primary bg-primary text-white shadow-card'
                  : 'border-mint bg-light text-ink hover:bg-mint',
              )}
            >
              {h} м
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
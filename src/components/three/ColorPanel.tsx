'use client';

import { cn } from '@/lib/cn';

const PRESETS = [
  '#f1ece6', '#ffffff', '#d6f5e5', '#0f7b4e', '#0a5c39', '#3ddc84',
  '#c8976a', '#7a5c43', '#9aa5a0', '#2b2b33', '#e6b0aa', '#1a2e24',
];

type Props = {
  label: string | null;
  color: string;
  onColorChange: (hex: string) => void;
};

/** Смена цвета выбранного элемента: поверхности комнаты или объекта */
export default function ColorPanel({ label, color, onColorChange }: Props) {
  if (!label) {
    return (
      <div className="rounded-card bg-white/10 p-4 text-sm leading-relaxed text-white/80">
        👆 Кликните по <b className="text-white">полу</b>, <b className="text-white">стенам</b> или{' '}
        <b className="text-white">объекту</b>, чтобы перекрасить его.
      </div>
    );
  }

  return (
    <div className="rounded-card bg-white/10 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">
          Цвет: <span className="text-accent">{label}</span>
        </p>
        <label className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
          Свой цвет
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            aria-label={`Выбрать цвет для: ${label}`}
            className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((c) => (
          <button
            key={c}
            onClick={() => onColorChange(c)}
            aria-label={`Цвет ${c}`}
            className={cn(
              'h-7 w-7 rounded-full ring-1 ring-white/25 transition hover:scale-110',
              color.toLowerCase() === c && 'ring-2 ring-white',
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}
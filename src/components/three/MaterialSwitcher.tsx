'use client';

import { cn } from '@/lib/cn';
import type { MaterialTheme } from './types';

const OPTIONS: { value: MaterialTheme; label: string; swatch: string }[] = [
  { value: 'wood', label: 'Дерево', swatch: '#c8976a' },
  { value: 'concrete', label: 'Бетон', swatch: '#9aa5a0' },
  { value: 'green', label: 'Изумруд', swatch: '#0f7b4e' },
  { value: 'marble', label: 'Мрамор', swatch: '#e6e9ee' },
];

type Props = {
  value: MaterialTheme;
  onChange: (value: MaterialTheme) => void;
};

/** Переключатель материалов отделки для 3D-сцены */
export default function MaterialSwitcher({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Выбор отделки">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={cn(
            'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
            value === opt.value
              ? 'border-primary bg-white shadow-card text-ink'
              : 'border-white/15 bg-white/10 text-white hover:bg-white/20',
          )}
        >
          <span className="h-3.5 w-3.5 rounded-full ring-1 ring-ink/10" style={{ backgroundColor: opt.swatch }} aria-hidden />
          {opt.label}
        </button>
      ))}
    </div>
  );
}
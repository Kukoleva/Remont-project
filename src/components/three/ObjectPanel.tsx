'use client';

import { type ReactNode } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { OBJECT_PRESETS, type ObjectKind, type SceneObject } from './types';
import { fileToDataUrl } from './utils';

type Props = {
  items: SceneObject[];
  selectedId: string | null;
  onAdd: (kind: ObjectKind) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<SceneObject>) => void;
  onSelect: (id: string) => void;
  onDuplicate: (id: string) => void;
};

const KINDS = Object.keys(OBJECT_PRESETS) as ObjectKind[];

/** Панель объектов: список, добавление, размер/позиция/поворот, удаление */
export default function ObjectPanel({ items, selectedId, onAdd, onRemove, onUpdate, onSelect, onDuplicate }: Props) {
  const selected = items.find((i) => i.id === selectedId) ?? null;

  const setSize = (axis: 0 | 1 | 2, value: number) => {
    if (!selected) return;
    const size = [...selected.size] as [number, number, number];
    size[axis] = value;
    // объект «стоит» на полу: y = половина высоты
    const position = [selected.position[0], size[1] / 2, selected.position[2]] as [number, number, number];
    onUpdate(selected.id, { size, position });
  };

  const setPosition = (axis: 0 | 2, value: number) => {
    if (!selected) return;
    const position = [...selected.position] as [number, number, number];
    position[axis] = value;
    onUpdate(selected.id, { position });
  };

  const setRotation = (deg: number) => {
    if (!selected) return;
    onUpdate(selected.id, { rotationY: (deg * Math.PI) / 180 });
  };

  return (
    <div className="space-y-4">
      {/* Список объектов */}
      <div className="rounded-card bg-white/10 p-4">
        <p className="mb-3 text-sm font-semibold text-white">Элементы ({items.length})</p>
        <ul className="space-y-1">
          {items.map((it) => (
            <li
              key={it.id}
              className={cn(
                'flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition',
                selectedId === it.id ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10',
              )}
            >
              <button onClick={() => onSelect(it.id)} className="flex-1 text-left">
                {OBJECT_PRESETS[it.kind].label}
              </button>
              <button
                onClick={() => onRemove(it.id)}
                aria-label="Удалить элемент"
                className="rounded p-1 text-white/60 transition hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
        {items.length === 0 && (
          <p className="text-xs text-white/60">Пока пусто — добавьте элемент ниже.</p>
        )}

        <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-white/60">Добавить</p>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <button
              key={k}
              onClick={() => onAdd(k)}
              className="flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
            >
              <Plus className="h-3.5 w-3.5" /> {OBJECT_PRESETS[k].label}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="rounded-card bg-white/10 p-4">
          <p className="mb-3 text-sm font-semibold text-white">
            Настройка: {OBJECT_PRESETS[selected.kind].label}
          </p>

          <div className="space-y-4">
            <Field label={`Ширина: ${selected.size[0].toFixed(1)} м`}>
              <input
                type="range"
                min={0.3}
                max={6}
                step={0.1}
                value={selected.size[0]}
                onChange={(e) => setSize(0, Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
            </Field>
            <Field label={`Высота: ${selected.size[1].toFixed(1)} м`}>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.05}
                value={selected.size[1]}
                onChange={(e) => setSize(1, Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
            </Field>
            <Field label={`Глубина: ${selected.size[2].toFixed(1)} м`}>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.05}
                value={selected.size[2]}
                onChange={(e) => setSize(2, Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
            </Field>

            <Field label={`Позиция влево/вправо: ${selected.position[0].toFixed(1)}`}>
              <input
                type="range"
                min={-4}
                max={4}
                step={0.1}
                value={selected.position[0]}
                onChange={(e) => setPosition(0, Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
            </Field>
            <Field label={`Позиция вперёд/назад: ${selected.position[2].toFixed(1)}`}>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.1}
                value={selected.position[2]}
                onChange={(e) => setPosition(2, Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
            </Field>
            <Field label={`Поворот: ${Math.round((selected.rotationY * 180) / Math.PI)}°`}>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={Math.round((selected.rotationY * 180) / Math.PI)}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-[#3DDC84]"
              />
            </Field>

            {/* Фото-текстура объекта */}
            <div>
              <p className="mb-1.5 text-xs text-white/70">Фото-текстура</p>
              <div className="flex items-center gap-2">
                <input
                  id="obj-texture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const url = await fileToDataUrl(f);
                    onUpdate(selected.id, { textureUrl: url });
                  }}
                />
                <label
                  htmlFor="obj-texture"
                  className="cursor-pointer rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
                >
                  Загрузить фото
                </label>
                {selected.textureUrl && (
                  <button
                    onClick={() => onUpdate(selected.id, { textureUrl: null })}
                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/10"
                  >
                    Убрать
                  </button>
                )}
              </div>
              {selected.textureUrl && (
                <div
                  className="mt-2 h-12 w-20 rounded bg-cover bg-center"
                  style={{ backgroundImage: `url(${selected.textureUrl})` }}
                  role="img"
                  aria-label="Текстура объекта"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onDuplicate(selected.id)}
                className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Plus className="h-4 w-4" /> Дублировать
              </button>
              <button
                onClick={() => onRemove(selected.id)}
                className="flex items-center justify-center gap-2 rounded-full border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/10"
              >
                <Trash2 className="h-4 w-4" /> Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs text-white/70">{label}</p>
      {children}
    </div>
  );
}
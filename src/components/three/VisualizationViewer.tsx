'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Rotate3d, MousePointerClick, Palette, ImageUp, Boxes } from 'lucide-react';
import MaterialSwitcher from './MaterialSwitcher';
import ColorPanel from './ColorPanel';
import PhotoUploader from './PhotoUploader';
import ObjectPanel from './ObjectPanel';
import { THEME_COLORS, DEFAULT_COLORS, OBJECT_PRESETS, DEFAULT_ITEMS, ROOM_LABELS } from './types';
import type { MaterialTheme, ObjectKind, SceneObject, Selection, Textures, RoomKey } from './types';

const STORAGE_KEY = 'remont-3d-scene';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-card-lg bg-light md:h-[520px]">
      <div className="flex flex-col items-center gap-3 text-muted">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm">Загрузка 3D-сцены…</span>
      </div>
    </div>
  ),
});

/** Интерактивный 3D-редактор квартиры: текстуры, объекты, цвета */
export default function VisualizationViewer() {
  const [theme, setTheme] = useState<MaterialTheme>('wood');
  const [floorColor, setFloorColor] = useState<string>(DEFAULT_COLORS.floor);
  const [wallColor, setWallColor] = useState<string>(DEFAULT_COLORS.walls);
  const [textures, setTextures] = useState<Textures>({ floor: null, walls: null });
  const [items, setItems] = useState<SceneObject[]>(DEFAULT_ITEMS);
  const [selection, setSelection] = useState<Selection>(null);
  const [dragging, setDragging] = useState(false);

  const applyTheme = (t: MaterialTheme) => {
    setTheme(t);
    setFloorColor(THEME_COLORS[t].floor);
    setWallColor(THEME_COLORS[t].walls);
  };

  const setTexture = (key: RoomKey, url: string | null) =>
    setTextures((prev) => ({ ...prev, [key]: url }));

  const addItem = (kind: ObjectKind) => {
    const preset = OBJECT_PRESETS[kind];
    const id = `${kind}-${Date.now()}`;
    const size = [...preset.size] as [number, number, number];
    const item: SceneObject = {
      id,
      kind,
      position: [0, size[1] / 2, 0],
      size,
      color: preset.color,
      rotationY: 0,
      textureUrl: null,
    };
    setItems((arr) => [...arr, item]);
    setSelection({ kind: 'object', id });
  };

  const removeItem = (id: string) => {
    setItems((arr) => arr.filter((i) => i.id !== id));
    setSelection((sel) => (sel?.kind === 'object' && sel.id === id ? null : sel));
  };

  const updateItem = (id: string, patch: Partial<SceneObject>) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const duplicateItem = (id: string) => {
    const src = items.find((i) => i.id === id);
    if (!src) return;
    const copy: SceneObject = {
      ...src,
      id: `${src.kind}-${Date.now()}`,
      position: [src.position[0] + 0.5, src.position[1], src.position[2] + 0.5],
    };
    setItems((arr) => [...arr, copy]);
    setSelection({ kind: 'object', id: copy.id });
  };

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  const dragStart = (id: string) => {
    setDragging(true);
    setSelection({ kind: 'object', id });
  };
  const dragMove = (id: string, x: number, z: number) => {
    setItems((arr) =>
      arr.map((i) =>
        i.id === id
          ? { ...i, position: [clamp(x, -3.8, 3.8), i.size[1] / 2, clamp(z, -2.8, 2.8)] as [number, number, number] }
          : i,
      ),
    );
  };
  const dragEnd = () => setDragging(false);

  // Восстановление сцены из localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as Partial<{
        floorColor: string;
        wallColor: string;
        textures: Textures;
        items: SceneObject[];
      }>;
      if (data.floorColor) setFloorColor(data.floorColor);
      if (data.wallColor) setWallColor(data.wallColor);
      if (data.textures) setTextures(data.textures);
      if (Array.isArray(data.items)) setItems(data.items);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Сохранение сцены при изменениях
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ floorColor, wallColor, textures, items }));
    } catch {
      /* превышен лимит localStorage — игнорируем */
    }
  }, [floorColor, wallColor, textures, items]);

  const selectedItem = selection?.kind === 'object' ? items.find((i) => i.id === selection.id) ?? null : null;
  const selectedRoom = selection?.kind === 'room' ? selection.key : null;

  const colorLabel = selectedItem
    ? OBJECT_PRESETS[selectedItem.kind].label
    : selectedRoom
      ? ROOM_LABELS[selectedRoom]
      : null;
  const color = selectedItem
    ? selectedItem.color
    : selectedRoom === 'floor'
      ? floorColor
      : selectedRoom === 'walls'
        ? wallColor
        : '#0f7b4e';

  const changeColor = (hex: string) => {
    if (selection?.kind === 'object') updateItem(selection.id, { color: hex });
    else if (selection?.kind === 'room') {
      if (selection.key === 'floor') setFloorColor(hex);
      else setWallColor(hex);
    }
  };

  return (
    <section className="section-pad bg-gradient-primary text-white">
      <div className="container-x">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3">
            <Rotate3d className="h-8 w-8 text-accent" />
            <div>
              <p className="text-sm text-white/80">Интерактивный 3D-редактор</p>
              <p className="font-semibold">Текстуры, мебель, стены — добавляйте и меняйте</p>
            </div>
          </div>
          <MaterialSwitcher value={theme} onChange={applyTheme} />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[300px_1fr]">
          {/* Панель управления */}
          <div className="space-y-3">
            <PhotoUploader textures={textures} onTexture={setTexture} />
            <ColorPanel label={colorLabel} color={color} onColorChange={changeColor} />
            <ObjectPanel
              items={items}
              selectedId={selectedItem?.id ?? null}
              onAdd={addItem}
              onRemove={removeItem}
              onUpdate={updateItem}
              onSelect={(id) => setSelection({ kind: 'object', id })}
              onDuplicate={duplicateItem}
            />
          </div>

          {/* Сцена — липкая при прокрутке настроек */}
          <div className="relative self-start lg:sticky lg:top-24">
            <Scene3D
              floorColor={floorColor}
              wallColor={wallColor}
              textures={textures}
              items={items}
              selection={selection}
              onSelect={setSelection}
              dragging={dragging}
              onDragStart={dragStart}
              onDragMove={dragMove}
              onDragEnd={dragEnd}
            />
            <span className="pointer-events-none absolute left-4 top-4 hidden items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-primary shadow-card md:inline-flex">
              <MousePointerClick className="h-4 w-4" /> Зажмите — вращение · клик — выбор элемента
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <p className="flex items-start gap-2 rounded-card bg-white/10 p-4 text-sm">
            <ImageUp className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            Загрузите фото отдельно для пола (ламинат) и стен (обои) — станут текстурами.
          </p>
          <p className="flex items-start gap-2 rounded-card bg-white/10 p-4 text-sm">
            <Boxes className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            Добавляйте мебель и перегородки любого размера, двигайте, поворачивайте и удаляйте.
          </p>
          <p className="flex items-start gap-2 rounded-card bg-white/10 p-4 text-sm">
            <Palette className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            Кликните по любому элементу и перекрасьте его в свой цвет из палитры.
          </p>
        </div>
      </div>
    </section>
  );
}
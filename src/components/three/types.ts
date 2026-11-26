/** Типы и пресеты интерактивной 3D-сцены */

export type MaterialTheme = 'wood' | 'concrete' | 'green' | 'marble';

/** Встроенные перекрашиваемые/текстурируемые поверхности комнаты */
export type RoomKey = 'floor' | 'walls';

export const ROOM_LABELS: Record<RoomKey, string> = {
  floor: 'Пол',
  walls: 'Стены',
};

/** Типы добавляемых объектов (мебель и перегородки/стены) */
export type ObjectKind =
  | 'sofa'
  | 'table'
  | 'closet'
  | 'bed'
  | 'chair'
  | 'shelf'
  | 'wall'
  | 'picture';

/** Добавленный в сцену объект произвольного размера */
export type SceneObject = {
  id: string;
  kind: ObjectKind;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotationY: number;
  /** фото-текстура объекта (data URL) */
  textureUrl?: string | null;
};

/** Выделение: поверхность комнаты либо объект */
export type Selection =
  | { kind: 'room'; key: RoomKey }
  | { kind: 'object'; id: string }
  | null;

/** Фото-текстуры, загруженные пользователем */
export type Textures = { floor: string | null; walls: string | null };

/** Пресеты объектов: название, размер (ширина × высота × глубина, м), цвет */
export const OBJECT_PRESETS: Record<
  ObjectKind,
  { label: string; size: [number, number, number]; color: string }
> = {
  sofa: { label: 'Диван', size: [2.4, 0.9, 0.9], color: '#3ddc84' },
  table: { label: 'Стол', size: [1.2, 0.75, 0.7], color: '#7a5c43' },
  closet: { label: 'Шкаф', size: [1.2, 2.2, 0.6], color: '#1a2e24' },
  bed: { label: 'Кровать', size: [2, 0.5, 1.6], color: '#0f7b4e' },
  chair: { label: 'Кресло', size: [0.7, 0.9, 0.7], color: '#e6b0aa' },
  shelf: { label: 'Тумба', size: [1, 0.8, 0.4], color: '#c8976a' },
  wall: { label: 'Перегородка', size: [3, 2.4, 0.1], color: '#f1ece6' },
  picture: { label: 'Картина', size: [1.4, 0.9, 0.05], color: '#0a5c39' },
};

/** Стартовый набор мебели в комнате */
export const DEFAULT_ITEMS: SceneObject[] = [
  { id: 'sofa-1', kind: 'sofa', position: [-1.4, 0.45, -1], size: [2.4, 0.9, 0.9], color: '#3ddc84', rotationY: 0 },
  { id: 'table-1', kind: 'table', position: [1.6, 0.375, 0.6], size: [1.2, 0.75, 0.7], color: '#7a5c43', rotationY: 0 },
  { id: 'closet-1', kind: 'closet', position: [-3.4, 1.1, -1.6], size: [1.2, 2.2, 0.6], color: '#1a2e24', rotationY: 0 },
];

/** Пресеты отделки (пол + стены) */
export const THEME_COLORS: Record<MaterialTheme, { floor: string; walls: string }> = {
  wood: { floor: '#c8976a', walls: '#f1ece6' },
  concrete: { floor: '#9aa5a0', walls: '#d9d9d9' },
  green: { floor: '#8a9a8d', walls: '#eaf4ee' },
  marble: { floor: '#e6e9ee', walls: '#ffffff' },
};

export const DEFAULT_COLORS = { ...THEME_COLORS.wood };
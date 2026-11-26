'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import ApartmentModel from './ApartmentModel';
import type { SceneObject, Selection, Textures } from './types';

type Props = {
  floorColor: string;
  wallColor: string;
  textures: Textures;
  items: SceneObject[];
  selection: Selection;
  onSelect: (sel: Selection) => void;
  /** режим drag&drop объекта мышью/пальцем */
  dragging: boolean;
  onDragStart: (id: string) => void;
  onDragMove: (id: string, x: number, z: number) => void;
  onDragEnd: () => void;
};

const CAMERA = { position: [6, 5, 8] as [number, number, number], fov: 45 };

/** Интерактивная 3D-сцена: текстуры, объекты, клик-выделение, drag&drop */
export default function Scene3D({
  floorColor,
  wallColor,
  textures,
  items,
  selection,
  onSelect,
  dragging,
  onDragStart,
  onDragMove,
  onDragEnd,
}: Props) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-card-lg bg-light md:h-[520px]">
      <Canvas camera={CAMERA} dpr={[1, 2]} shadows onPointerMissed={() => onSelect(null)}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} castShadow />
        <Suspense fallback={null}>
          <ApartmentModel
            floorColor={floorColor}
            wallColor={wallColor}
            textures={textures}
            items={items}
            selection={selection}
            onSelect={onSelect}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />
        </Suspense>
        {/* Во время drag выключаем вращение камеры */}
        <OrbitControls enablePan={false} minPolarAngle={0.2} maxPolarAngle={1.45} enabled={!dragging} />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.35} blur={2.5} far={8} />
      </Canvas>
    </div>
  );
}
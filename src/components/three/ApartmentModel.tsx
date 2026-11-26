'use client';

import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneObject, Selection, Textures } from './types';

type Props = {
  floorColor: string;
  wallColor: string;
  textures: Textures;
  items: SceneObject[];
  selection: Selection;
  onSelect: (sel: Selection) => void;
  onDragStart: (id: string) => void;
  onDragMove: (id: string, x: number, z: number) => void;
  onDragEnd: () => void;
};

type Click = (e: ThreeEvent<MouseEvent>) => void;

const glow = (sel: boolean) => (sel ? '#3ddc84' : '#000000');
const glowInt = (sel: boolean) => (sel ? 0.3 : 0);

/** Пол с фото-текстурой (ламинат / плитка) */
function TexturedFloor({ url, onClick }: { url: string; onClick: Click }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onClick={onClick}>
      <planeGeometry args={[8, 6]} />
      <meshStandardMaterial map={tex} roughness={0.8} />
    </mesh>
  );
}

/** Стены с фото-текстурой (обои) — текстура на все три стены */
function TexturedWalls({ url, onClick }: { url: string; onClick: Click }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <>
      <mesh position={[0, 1.2, -3]} receiveShadow onClick={onClick}>
        <boxGeometry args={[8, 2.4, 0.1]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
      <mesh position={[-4, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow onClick={onClick}>
        <boxGeometry args={[6, 2.4, 0.1]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
      <mesh position={[4, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow onClick={onClick}>
        <boxGeometry args={[6, 2.4, 0.1]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
    </>
  );
}

/** Текстура объекта (загруженное фото) */
function TexturedMaterial({ url, isSelected }: { url: string; isSelected: boolean }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <meshStandardMaterial
      map={tex}
      roughness={0.7}
      emissive={glow(isSelected)}
      emissiveIntensity={glowInt(isSelected)}
    />
  );
}

function SolidMaterial({ color, isSelected }: { color: string; isSelected: boolean }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.7}
      emissive={glow(isSelected)}
      emissiveIntensity={glowInt(isSelected)}
    />
  );
}

/** Объект мебели/перегородки: клик-выделение, drag&drop по полу, текстура/цвет */
function Item({
  item,
  isSelected,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  item: SceneObject;
  isSelected: boolean;
  onSelect: () => void;
  onDragStart: (id: string) => void;
  onDragMove: (id: string, x: number, z: number) => void;
  onDragEnd: () => void;
}) {
  const dragging = useRef(false);
  const moved = useRef(false);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  return (
    <group position={item.position} rotation={[0, item.rotationY, 0]}>
      <mesh
        castShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          dragging.current = true;
          moved.current = false;
          const el = e.target as unknown as HTMLElement;
          el?.setPointerCapture?.(e.nativeEvent.pointerId);
          onDragStart(item.id);
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          moved.current = true;
          e.ray.intersectPlane(plane, hit);
          onDragMove(item.id, hit.x, hit.z);
        }}
        onPointerUp={(e) => {
          if (!dragging.current) return;
          dragging.current = false;
          const el = e.target as unknown as HTMLElement;
          el?.releasePointerCapture?.(e.nativeEvent.pointerId);
          onDragEnd();
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!moved.current) onSelect();
        }}
      >
        <boxGeometry args={item.size} />
        {item.textureUrl ? (
          <TexturedMaterial url={item.textureUrl} isSelected={isSelected} />
        ) : (
          <SolidMaterial color={item.color} isSelected={isSelected} />
        )}
      </mesh>
    </group>
  );
}

export default function ApartmentModel({
  floorColor,
  wallColor,
  textures,
  items,
  selection,
  onSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
}: Props) {
  const isFloorSel = selection?.kind === 'room' && selection.key === 'floor';
  const isWallsSel = selection?.kind === 'room' && selection.key === 'walls';

  const pickFloor: Click = (e) => {
    e.stopPropagation();
    onSelect({ kind: 'room', key: 'floor' });
  };
  const pickWalls: Click = (e) => {
    e.stopPropagation();
    onSelect({ kind: 'room', key: 'walls' });
  };

  return (
    <group position={[0, -0.5, 0]}>
      {/* Пол */}
      {textures.floor ? (
        <TexturedFloor url={textures.floor} onClick={pickFloor} />
      ) : (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onClick={pickFloor}>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial
            color={floorColor}
            roughness={0.75}
            emissive={glow(isFloorSel)}
            emissiveIntensity={glowInt(isFloorSel)}
          />
        </mesh>
      )}

      {/* Стены */}
      {textures.walls ? (
        <TexturedWalls url={textures.walls} onClick={pickWalls} />
      ) : (
        <>
          <mesh position={[0, 1.2, -3]} receiveShadow onClick={pickWalls}>
            <boxGeometry args={[8, 2.4, 0.1]} />
            <meshStandardMaterial
              color={wallColor}
              roughness={0.9}
              emissive={glow(isWallsSel)}
              emissiveIntensity={glowInt(isWallsSel)}
            />
          </mesh>
          <mesh position={[-4, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow onClick={pickWalls}>
            <boxGeometry args={[6, 2.4, 0.1]} />
            <meshStandardMaterial
              color={wallColor}
              roughness={0.9}
              emissive={glow(isWallsSel)}
              emissiveIntensity={glowInt(isWallsSel)}
            />
          </mesh>
          <mesh position={[4, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow onClick={pickWalls}>
            <boxGeometry args={[6, 2.4, 0.1]} />
            <meshStandardMaterial
              color={wallColor}
              roughness={0.9}
              emissive={glow(isWallsSel)}
              emissiveIntensity={glowInt(isWallsSel)}
            />
          </mesh>
        </>
      )}

      {/* Добавленные объекты */}
      {items.map((it) => (
        <Item
          key={it.id}
          item={it}
          isSelected={selection?.kind === 'object' && selection.id === it.id}
          onSelect={() => onSelect({ kind: 'object', id: it.id })}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />
      ))}
    </group>
  );
}
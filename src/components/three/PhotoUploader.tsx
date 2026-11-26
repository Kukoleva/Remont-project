'use client';

import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { fileToDataUrl } from './utils';
import type { RoomKey, Textures } from './types';

const SLOTS: { key: RoomKey; title: string; hint: string }[] = [
  { key: 'floor', title: 'Пол', hint: 'ламинат / плитка' },
  { key: 'walls', title: 'Стены', hint: 'обои / краска' },
];

type Props = {
  textures: Textures;
  onTexture: (key: RoomKey, url: string | null) => void;
};

/** Загрузка фото-текстур: отдельно для пола и для стен */
export default function PhotoUploader({ textures, onTexture }: Props) {
  return (
    <div className="rounded-card bg-white/10 p-4">
      <p className="mb-3 text-sm font-semibold text-white">Фото-текстуры</p>
      <div className="space-y-3">
        {SLOTS.map((slot) => (
          <TextureSlot
            key={slot.key}
            slot={slot}
            url={textures[slot.key]}
            onChange={(url) => onTexture(slot.key, url)}
          />
        ))}
      </div>
    </div>
  );
}

function TextureSlot({
  slot,
  url,
  onChange,
}: {
  slot: (typeof SLOTS)[number];
  url: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = async (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Выберите изображение (JPG, PNG, WEBP).');
      return;
    }
    const url = await fileToDataUrl(file);
    onChange(url);
  };

  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files?.[0])} />

      {url ? (
        <div
          className="h-14 w-14 shrink-0 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${url})` }}
          role="img"
          aria-label={`Фото: ${slot.title}`}
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/50">
          <Upload className="h-5 w-5" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{slot.title}</p>
        <p className="text-xs text-white/60">{slot.hint}</p>
      </div>

      <button
        onClick={() => inputRef.current?.click()}
        className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-accent-dark"
      >
        {url ? 'Заменить' : 'Выбрать'}
      </button>
      {url && (
        <button
          onClick={() => onChange(null)}
          aria-label={`Убрать фото ${slot.title}`}
          className="rounded p-1 text-white/60 transition hover:text-red-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
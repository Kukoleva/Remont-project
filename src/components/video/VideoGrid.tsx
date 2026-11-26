'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/cn';
import videos from '@/data/videos.json';

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative aspect-video w-full bg-ink/5">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button onClick={() => setPlaying(true)} aria-label={`Смотреть: ${video.title}`} className="group absolute inset-0 h-full w-full">
            <Image
              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/30 transition group-hover:bg-ink/40">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-glow transition group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
              </span>
            </span>
            <span className="absolute bottom-2 right-2 rounded bg-ink/70 px-2 py-0.5 text-xs text-white">{video.duration}</span>
          </button>
        )}
      </div>
      <figcaption className="p-4">
        <p className="text-sm font-semibold text-ink">{video.title}</p>
        <p className="mt-1 text-xs text-muted">{video.category} · {video.city}</p>
      </figcaption>
    </figure>
  );
}

/** Сетка видео с фильтром по категории */
export default function VideoGrid() {
  const categories = ['Все', ...Array.from(new Set(videos.map((v) => v.category)))];
  const [cat, setCat] = useState('Все');

  const filtered = cat === 'Все' ? videos : videos.filter((v) => v.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Категории видео">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              cat === c ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import videos from '@/data/videos.json';

/** Карточка видео: lazy-load YouTube iframe при клике */
function VideoCard({ videoId, title, duration }: { videoId: string; title: string; duration: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative aspect-video w-full bg-ink/5">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Смотреть видео: ${title}`}
          >
            <Image
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
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
            <span className="absolute bottom-2 right-2 rounded bg-ink/70 px-2 py-0.5 text-xs font-medium text-white">
              {duration}
            </span>
          </button>
        )}
      </div>
      <p className="p-4 text-sm font-semibold text-ink">{title}</p>
    </div>
  );
}

/** Блок видео на главной */
export default function VideoBlock() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Видео работ</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Смотрите процесс своими глазами</h2>
          </div>
          <Link href="/video" className="group flex items-center gap-2 font-semibold text-primary">
            Все видео
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((v) => (
            <VideoCard key={v.id} videoId={v.youtubeId} title={v.title} duration={v.duration} />
          ))}
        </div>
      </div>
    </section>
  );
}
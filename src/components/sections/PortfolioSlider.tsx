'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import portfolio from '@/data/portfolio.json';

/** Слайдер «до/после»: перетаскиваемый разделитель поверх двух заглушек */
function BeforeAfter({ label }: { label: string }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-card select-none">
      {/* ДО */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#e6ede9]" aria-hidden>
        <span className="text-sm font-semibold uppercase tracking-wider text-muted">До</span>
      </div>
      {/* ПОСЛЕ — обрезается по позиции */}
      <div
        className="img-placeholder-gradient absolute inset-0 flex items-center justify-center"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        aria-hidden
      >
        <span className="text-sm font-semibold text-primary">После</span>
      </div>
      {/* Разделитель */}
      <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-card">
          ⇆
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Слайдер до/после: ${label}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/** Портфолио: слайдер «до/после» + карточки кейсов */
export default function PortfolioSlider() {
  return (
    <section className="section-pad bg-light">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Портфолио</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              Наши работы: смета, сроки, результат
            </h2>
          </div>
          <Link href="/portfolio" className="group flex items-center gap-2 font-semibold text-primary">
            Все работы
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <BeforeAfter label={p.title} />
              <div className="p-5">
                <h3 className="text-lg font-bold transition group-hover:text-primary">{p.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {p.city}
                  </span>
                  <span>{p.area} м²</span>
                  <span>· {p.rooms} комн.</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-mint/60 pt-3">
                  <span className="font-heading text-lg font-extrabold text-primary">
                    {p.price.toLocaleString('ru-RU')} BYN
                  </span>
                  <span className="text-xs text-muted">⚠ {p.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
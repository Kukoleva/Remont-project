'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { cn } from '@/lib/cn';
import portfolio from '@/data/portfolio.json';

const IMAGES = ['/images/2.jpeg','/images/3.jpeg','/images/23.jpeg','/images/5.jpeg','/images/6.jpeg','/images/8.jpeg','/images/9.jpeg','/images/10.jpeg','/images/11.jpeg','/images/13.jpeg','/images/15.jpeg','/images/16.jpeg','/images/17.jpeg','/images/18.jpeg','/images/19.jpeg','/images/20.jpeg','/images/21.jpeg','/images/24.jpeg','/images/25.jpeg','/images/26.jpeg','/images/27.jpeg','/images/28.jpeg','/images/29.jpeg','/images/30.jpeg','/images/32.jpeg','/images/33.jpeg','/images/34.jpeg','/images/35.jpeg','/images/36.jpeg','/images/37.jpeg','/images/38.jpeg','/images/39.jpeg','/images/55.jpeg'];
const CITIES = ['Все', 'Минск', 'Гомель'] as const;
const TYPES: { value: string; label: string }[] = [
  { value: 'all', label: 'Все типы' },
  { value: 'kapitalnyj', label: 'Капитальный' },
  { value: 'remont-pod-klyuch', label: 'Под ключ' },
  { value: 'kosmeticheskij', label: 'Косметический' },
  { value: 'dizajn-proekt', label: 'Дизайн' },
  { value: 'vannaya-komnata', label: 'Ванная' },
  { value: 'kuhnya', label: 'Кухня' },
];

/** Список портфолио с фильтрами по городу и типу */
export default function PortfolioList() {
  const [city, setCity] = useState<(typeof CITIES)[number]>('Все');
  const [type, setType] = useState('all');

  const filtered = portfolio.filter(
    (p) => (city === 'Все' || p.city === city) && (type === 'all' || p.type === type),
  );

  return (
    <div>
      {/* Фильтры */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по городу">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              aria-pressed={city === c}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                city === c ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Тип ремонта"
          className="rounded-full border border-mint bg-light px-4 py-2 text-sm font-medium text-ink focus:border-primary focus:outline-none"
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Сетка */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <Link
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="group overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
          >
            <img src={IMAGES[i % IMAGES.length]} alt={p.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-lg font-bold transition group-hover:text-primary">{p.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {p.city}</span>
                <span>{p.area} м²</span>
                <span>· {p.rooms} комн.</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-mint/60 pt-3">
                <span className="font-heading text-lg font-extrabold text-primary">
                  {p.price.toLocaleString('ru-RU')} BYN
                </span>
                <span className="text-xs text-muted">⏱ {p.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted">
          По выбранным фильтрам пока нет объектов. Сбросьте фильтры или позвоните нам.
        </p>
      )}
    </div>
  );
}
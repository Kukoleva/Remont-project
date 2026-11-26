'use client';

import Link from 'next/link';
import { CalendarClock, Phone } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';

/** Список ссылок для выдвижного мобильного меню */
export default function MobileMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Мобильная навигация">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="rounded-xl px-4 py-3 text-base font-medium text-ink transition hover:bg-mint hover:text-primary"
        >
          {link.label}
        </Link>
      ))}

      <div className="mt-4 space-y-3 border-t border-mint/60 pt-4">
        <a href={SITE.phoneHref} className="flex items-center gap-2 font-semibold text-primary">
          <Phone className="h-5 w-5" /> {SITE.phone}
        </a>
        <p className="flex items-center gap-2 text-sm text-muted">
          <CalendarClock className="h-4 w-4" /> {SITE.hours}
        </p>
        <a
          href="https://vdomeremont.by"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="block rounded-full border border-primary/20 px-5 py-2.5 text-center text-sm font-semibold text-primary"
        >
          Цены подробнее — vdomeremont.by
        </a>
        <Link
          href="/kalkulyator"
          onClick={onNavigate}
          className="block rounded-full bg-accent px-5 py-3 text-center font-semibold text-ink shadow-glow"
        >
          Рассчитать стоимость
        </Link>
      </div>
    </nav>
  );
}
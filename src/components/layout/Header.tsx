'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Phone, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { trackCallClick } from '@/lib/analytics';
import MobileMenu from './MobileMenu';

/** «Липкая» шапка: логотип, навигация, телефон и CTA */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-mint/60 bg-white/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Ремонт Квартир — на главную">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white shadow-card">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg font-extrabold text-ink">Ремонт Квартир</span>
              <span className="hidden text-xs text-muted sm:block">Минск · Гомель</span>
            </span>
          </Link>

          {/* Навигация (десктоп) */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink/80 transition hover:bg-mint hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Телефон + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={SITE.phoneHref}
              onClick={trackCallClick}
              className="flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              {SITE.phone}
            </a>
            <a
              href="https://vdomeremont.by"
              target="_blank"
              rel="noopener noreferrer"
              title="Подробные цены на ремонт — vdomeremont.by"
              className="hidden flex-col items-start leading-tight xl:flex"
            >
              <span className="text-[11px] text-muted">Цены подробнее</span>
              <span className="text-sm font-semibold text-primary">vdomeremont.by</span>
            </a>
            <Link
              href="/kalkulyator"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink shadow-glow transition hover:bg-accent-dark"
            >
              Рассчитать стоимость
            </Link>
          </div>

          {/* Бургер (мобильный) */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-mint md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Подменю мобильного */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button className="absolute inset-0 bg-ink/40" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню" />
          <div className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-mint/60 px-5 py-4">
              <span className="font-heading text-lg font-extrabold">Меню</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
                className="rounded-full p-2 text-ink transition hover:bg-mint"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <MobileMenu onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
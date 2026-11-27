import Link from 'next/link';
import { Mail, Phone, Send, MessageCircle, Globe } from 'lucide-react';
import { NAV_LINKS, SITE, RELATED_SITES } from '@/lib/constants';
import services from '@/data/services.json';

/** Футер: NAP-контакты, навигация, услуги, мессенджеры, правовая информация */
export default function Footer() {
  return (
    <footer className="border-t border-mint/60 bg-gradient-primary text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* О нас */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#3DDC84" strokeWidth="2.5">
                <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-heading text-lg font-extrabold">Ремонт Квартир</span>
          </div>
          <p className="text-sm leading-relaxed text-white/80">
            Ремонт квартир под ключ в Минске и Гомеле. Фиксированная смета
            и гарантия 3 года.
          </p>
          <div className="flex gap-3">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-accent hover:text-ink"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-accent hover:text-ink"
            >
              <Send className="h-5 w-5" />
            </a>
          </div>

          {/* Наши сайты */}
          <div className="space-y-2 pt-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Наши сайты</p>
            {RELATED_SITES.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/80 transition hover:text-accent"
              >
                <Globe className="h-3.5 w-3.5" /> {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Услуги */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-accent">Услуги</h3>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/uslugi/${s.slug}`} className="text-sm text-white/80 transition hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Навигация */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-accent">Разделы</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/80 transition hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-accent">Контакты</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-white/80">
              <span className="font-semibold text-white">Работаем:</span> Минск и Гомель
            </li>
            <li className="flex gap-3 text-sm">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={SITE.phoneHref} className="font-semibold text-white transition hover:text-accent">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3 text-sm">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${SITE.email}`} className="break-all text-white/80 transition hover:text-accent">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3 text-sm">
              <Send className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 transition hover:text-accent">
                {SITE.telegram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.legalName}. Все права защищены.</p>
          <div className="flex gap-5">
            <Link href="/politika" className="transition hover:text-accent">Политика конфиденциальности</Link>
            <Link href="/oferta" className="transition hover:text-accent">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
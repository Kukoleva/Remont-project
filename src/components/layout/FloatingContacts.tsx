'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Send, X } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { trackCallClick, trackMessengerClick } from '@/lib/analytics';

/** Плавающая кнопка (FAB) с раскрытием мессенджеров + sticky-панель «Позвонить» на мобильных */
export default function FloatingContacts() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB — мессенджеры (правый нижний угол) */}
      <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
        {open && (
          <div className="flex flex-col items-end gap-2 animate-fade-up">
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick('telegram')}
              aria-label="Написать в Telegram"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2AABEE] text-white shadow-lift transition hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick('whatsapp')}
              aria-label="Написать в WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={SITE.viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMessengerClick('viber')}
              aria-label="Написать в Viber"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7360F2] text-white shadow-lift transition hover:scale-105"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Закрыть мессенджеры' : 'Открыть мессенджеры'}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink shadow-glow transition hover:scale-105"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      {/* Sticky-панель «Позвонить» внизу на мобильных */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-mint bg-white/95 p-3 backdrop-blur md:hidden">
        <a
          href={SITE.phoneHref}
          onClick={trackCallClick}
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" /> Позвонить
        </a>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMessengerClick('whatsapp')}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-ink"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </>
  );
}
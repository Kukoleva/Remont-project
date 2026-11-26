'use client';

import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent';

/** Cookie-баннер (GDPR/РБ): согласие сохраняется в localStorage */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* noop */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-[70] mx-auto max-w-lg rounded-card bg-white p-5 shadow-lift ring-1 ring-mint md:bottom-6">
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-semibold text-ink">Мы используем cookie</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Файлы cookie помогают улучшить работу сайта и показывать актуальные предложения.
            Продолжая использовать сайт, вы соглашаетесь с{' '}
            <a href="/politika" className="text-primary underline">политикой конфиденциальности</a>.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={accept}
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark"
            >
              Принять
            </button>
            <button
              onClick={accept}
              className="rounded-full border border-mint px-4 py-2 text-xs font-semibold text-primary transition hover:bg-mint"
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
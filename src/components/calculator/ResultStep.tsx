'use client';

import { Send, MessageCircle, Printer } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { formatBYN, buildEstimateMessage } from '@/lib/calculator';
import { trackCalculatorSent } from '@/lib/analytics';
import type { CalculatorInput, CalculatorResult } from '@/types/calculator';

type Props = {
  input: CalculatorInput;
  result: CalculatorResult;
};

/** Шаг 4: итоговая смета + отправка в мессенджеры */
export default function ResultStep({ input, result }: Props) {
  const message = buildEstimateMessage(input, result);
  const encoded = encodeURIComponent(message);

  const whatsapp = `https://wa.me/37525666094?text=${encoded}`;
  const telegram = `https://t.me/share/url?url=${encodeURIComponent(SITE.url)}&text=${encoded}`;

  return (
    <div>
      {/* Итог */}
      <div className="rounded-card bg-gradient-primary p-6 text-center text-white">
        <p className="text-sm text-white/80">Итоговая стоимость под ключ</p>
        <p className="mt-2 font-heading text-4xl font-extrabold md:text-5xl">{formatBYN(result.grandTotal)}</p>
        <p className="mt-2 text-sm text-white/80">Срок ~{result.durationDays} раб. дней</p>
      </div>

      {/* Материалы */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">Материалы</h3>
        <ul className="mt-3 divide-y divide-mint/60 rounded-card border border-mint">
          {result.materials.map((m) => (
            <li key={m.slug} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-ink">
                {m.name}
                <span className="ml-2 text-xs text-muted">×{m.amount} {m.unit}</span>
              </span>
              <span className="font-semibold text-ink">{formatBYN(m.total)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between bg-light px-4 py-2.5 text-sm font-bold">
            <span>Итого материалы</span>
            <span>{formatBYN(result.materialsTotal)}</span>
          </li>
        </ul>
      </div>

      {/* Работы */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">Работы</h3>
        <ul className="mt-3 divide-y divide-mint/60 rounded-card border border-mint">
          {result.works.map((w) => (
            <li key={w.slug} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="text-ink">
                {w.name}
                <span className="ml-2 text-xs text-muted">×{w.quantity} {w.unit}</span>
              </span>
              <span className="font-semibold text-ink">{formatBYN(w.total)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between bg-light px-4 py-2.5 text-sm font-bold">
            <span>Итого работы</span>
            <span>{formatBYN(result.worksTotal)}</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCalculatorSent('whatsapp')}
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-card transition hover:brightness-95"
        >
          <MessageCircle className="h-5 w-5" /> Смета в WhatsApp
        </a>
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCalculatorSent('telegram')}
          className="flex items-center justify-center gap-2 rounded-full bg-[#2AABEE] px-6 py-3.5 font-semibold text-white shadow-card transition hover:brightness-95"
        >
          <Send className="h-5 w-5" /> Смета в Telegram
        </a>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-mint px-6 py-3 font-semibold text-primary transition hover:bg-mint"
      >
        <Printer className="h-5 w-5" /> Скачать смету (PDF)
      </button>

      <p className="mt-4 text-center text-xs text-muted">
        Смета предварительная. Точную стоимость подтвердит инженер после бесплатного замера.
      </p>
    </div>
  );
}
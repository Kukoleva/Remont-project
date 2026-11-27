import type { Metadata } from 'next';
import { Phone, Mail, Clock3, Send, MessageCircle, Globe } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import SchemaLocalBusiness from '@/components/seo/SchemaLocalBusiness';
import { SITE, RELATED_SITES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Контакты — ремонт квартир в Минске и Гомеле',
  description:
    'Наши контакты  по ремонту квартир: телефон, WhatsApp, Telegram, email. Работаем в Минске и Гомеле, бесплатный выезд на замер.',
};

export default function ContactsPage() {
  return (
    <>
      <SchemaLocalBusiness />
      <Breadcrumbs items={[{ label: 'Контакты' }]} />
      <section className="container-x pt-8 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Контакты</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Свяжитесь со мной</h1>
          <p className="mt-4 text-lg text-muted">
            Звоните или пишите в мессенджеры — отвечу в течение 15 минут в рабочее время.
          </p>
        </div>

        {/* Контактные карточки */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-4 rounded-card bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
          >
            <Phone className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-muted">Телефон</p>
              <p className="font-heading text-xl font-extrabold text-ink">{SITE.phone}</p>
            </div>
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-4 rounded-card bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
          >
            <Mail className="h-8 w-8 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm text-muted">Почта</p>
              <p className="break-all font-semibold text-ink">{SITE.email}</p>
            </div>
          </a>
        </div>

        {/* Мессенджеры */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-card bg-[#25D366] p-5 font-semibold text-white shadow-card transition hover:brightness-95"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <a
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-card bg-[#2AABEE] p-5 font-semibold text-white shadow-card transition hover:brightness-95"
          >
            <Send className="h-5 w-5" /> Telegram: {SITE.telegram}
          </a>
          <a
            href={SITE.viberUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-card bg-[#7360F2] p-5 font-semibold text-white shadow-card transition hover:brightness-95"
          >
            <Phone className="h-5 w-5" /> Viber
          </a>
        </div>

        {/* Режим работы и связанные сайты */}
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="flex flex-col items-center gap-4 rounded-card bg-light p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="flex items-center justify-center gap-2 text-sm font-semibold text-ink md:justify-start">
                <Clock3 className="h-4 w-4 text-primary" /> Работаем: Минск и Гомель · {SITE.hours}
              </p>
              <p className="mt-1 text-sm text-muted">Другие наши сайты: с подробными ценами</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {RELATED_SITES.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary transition hover:bg-mint"
                >
                  <Globe className="h-4 w-4" /> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LeadSection
        title="Запишитесь на бесплатный замер"
        subtitle="Оставьте заявку — приеду на объект в удобное время и составлю точную смету."
        source="kontakty"
      />
    </>
  );
}
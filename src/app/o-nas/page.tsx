import type { Metadata } from 'next';
import { ShieldCheck, FileText, Award, Wrench } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Card } from '@/components/ui/Card';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'О нас — частный мастер по ремонту квартир в Минске и Гомеле',
  description:
    'Частный мастер по ремонту квартир (ИП) в Минске и Гомеле: 10+ лет опыта, гарантия 3 года, фикс-цена по договору, без посредников и наценок.',
  keywords: ['частный мастер ремонт', 'ип ремонт квартир', 'ремонт квартир минск', 'ремонт квартир гомель'],
};

const stats = [
  { icon: Award, value: '10+', label: 'лет опыта' },
  { icon: Wrench, value: '100+', label: 'выполненных ремонтов' },
  { icon: ShieldCheck, value: '3 года', label: 'гарантии' },
];

const guarantees = [
  { title: 'Гарантия 3 года', text: 'На все виды черновых и чистовых работ по договору.' },
  { title: 'Фикс-цена', text: 'Цены не меняются в процессе.' },
];

export default function AboutPage() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: ['Минск', 'Гомель'],
  };

  return (
    <>
      <JsonLd data={orgLd} />
      <Breadcrumbs items={[{ label: 'О нас' }]} />

      <section className="container-x grid items-center gap-10 py-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">О нас</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            опыт 10+ лет по ремонту квартир
          </h1>
          <p className="mt-4 text-lg text-muted">
            Работаю как индивидуальный предприниматель — ремонт квартир
            под ключ в Минске и Гомеле. Без посредников, офисов и лишних наценок.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-card bg-light p-4 text-center">
                <s.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 font-heading text-2xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <PlaceholderImage label="мастер по ремонту квартир" ratio="4/3" className="w-full" />
      </section>

      {/* Гарантии */}
      <section className="section-pad bg-light">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold">Мои гарантии</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <Card key={g.title} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h3 className="mt-3 font-bold">{g.title}</h3>
                <p className="mt-2 text-sm text-muted">{g.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Документы */}
      <section className="section-pad">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold">Работаю официально</h2>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {['Свидетельство ИП', 'Договор подряда (образец)', 'Гарантийные обязательства',].map(
              (d) => (
                <div key={d} className="flex items-center gap-3 rounded-card bg-white p-4 shadow-card">
                  <FileText className="h-6 w-6 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-ink">{d}</span>
                </div>
              ),
            )}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            {SITE.legalName}. Предоставлю документы по запросу.
          </p>
        </div>
      </section>

      <LeadSection
        title="Обсудим ваш ремонт?"
        subtitle="Позвоните или напишите — бесплатно проконсультирую и приеду на замер."
        source="o-nas"
      />
    </>
  );
}
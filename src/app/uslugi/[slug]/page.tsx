import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, Clock, Banknote } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import SchemaService from '@/components/seo/SchemaService';
import SchemaFAQ from '@/components/seo/SchemaFAQ';
import { Accordion } from '@/components/ui/Accordion';
import { buildMetadata } from '@/lib/seo';
import services from '@/data/services.json';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return buildMetadata({
    title: service.h1,
    description: service.seoDescription,
    path: `/uslugi/${service.slug}`,
    keywords: service.seoKeywords,
  });
}

const PROCESS = [
  { title: 'Выезд инженера', text: 'Бесплатный замер, консультация и обсуждение задач.' },
  { title: 'Смета и договор', text: 'Фикс-цена и сроки — до подписания договора.' },
  { title: 'Выполнение работ', text: 'Поэтапные работы с фотоотчётами.' },
  { title: 'Сдача объекта', text: 'Приёмка по акту, уборка и гарантия 3 года.' },
];

const FAQ = [
  { question: 'Сколько стоит выезд на замер?', answer: 'Выезд на объект в Минске и Гомеле — бесплатный, в любое удобное время.' },
  { question: 'Фиксируется ли цена в договоре?', answer: 'Да, смета фиксируется в договоре.' },
  { question: 'Какая гарантия на работы?', answer: 'На все виды работ действует гарантия 3 года. Гарантийные случаи устраняем бесплатно.' },
];

export default function ServicePage({ params }: Params) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* Hero услуги */}
      <section className="bg-light">
        <Breadcrumbs items={[{ label: 'Услуги', href: '/uslugi' }, { label: service.title }]} />
        <div className="container-x grid items-center gap-8 py-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{service.h1}</h1>
            <p className="mt-4 max-w-lg text-lg text-muted">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-8">
              <div>
                <p className="text-sm text-muted">Стоимость</p>
                <p className="mt-1 flex items-center gap-2 font-heading text-2xl font-extrabold text-primary">
                  <Banknote className="h-6 w-6" /> от {service.priceFrom} {service.priceUnit}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Срок</p>
                <p className="mt-1 flex items-center gap-2 font-heading text-2xl font-extrabold text-primary">
                  <Clock className="h-6 w-6" /> {service.duration}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kalkulyator" className="rounded-full bg-accent px-6 py-3.5 font-semibold text-ink shadow-glow transition hover:bg-accent-dark">
                Рассчитать стоимость
              </Link>
              <Link href="/portfolio" className="rounded-full border border-primary/25 px-6 py-3.5 font-semibold text-primary transition hover:bg-mint">
                Смотреть работы
              </Link>
            </div>
          </div>

          <div className="rounded-card-lg bg-white p-6 shadow-card md:p-8">
            <h2 className="text-lg font-bold">Что входит</h2>
            <ul className="mt-4 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Этапы */}
      <section className="section-pad">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold">Как проходит работа</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="rounded-card border border-mint bg-white p-6 shadow-card">
                <span className="font-heading text-3xl font-extrabold text-mint">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Похожие услуги (внутренняя перелинковка) */}
      <section className="container-x pb-16">
        <h2 className="text-2xl font-extrabold md:text-3xl">Похожие услуги</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/uslugi/${r.slug}`} className="rounded-card border border-mint bg-light p-5 transition hover:-translate-y-1 hover:shadow-lift">
              <h3 className="font-bold text-ink">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">от {r.priceFrom} {r.priceUnit}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x pb-16">
        <SchemaFAQ items={FAQ} />
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold">Вопросы по услуге</h2>
          <div className="mt-8">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>

      <SchemaService
        name={service.title}
        description={service.seoDescription}
        offersFrom={service.priceFrom}
        offersUnit={service.priceUnit}
      />
      <LeadSection source={`uslugi/${service.slug}`} />
    </>
  );
}
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import SchemaService from '@/components/seo/SchemaService';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { buildMetadata } from '@/lib/seo';
import portfolio from '@/data/portfolio.json';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const item = portfolio.find((p) => p.slug === params.slug);
  if (!item) return {};
  return buildMetadata({
    title: `${item.title} — ${item.city}`,
    description: item.description,
    path: `/portfolio/${item.slug}`,
  });
}

export default function PortfolioDetail({ params }: Params) {
  const item = portfolio.find((p) => p.slug === params.slug);
  if (!item) notFound();

  const related = portfolio.filter((p) => p.slug !== item.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Портфолио', href: '/portfolio' }, { label: item.title }]} />

      <section className="container-x grid gap-8 py-10 lg:grid-cols-2">
        <div>
          <PlaceholderImage label={`${item.title} — до/после`} ratio="4/3" className="w-full" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold md:text-4xl">{item.title}</h1>
          <p className="mt-3 flex items-center gap-1 text-muted">
            <MapPin className="h-4 w-4 text-primary" /> {item.city}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-card bg-light p-4 text-center">
              <p className="text-xs text-muted">Площадь</p>
              <p className="font-heading text-xl font-extrabold text-primary">{item.area} м²</p>
            </div>
            <div className="rounded-card bg-light p-4 text-center">
              <p className="text-xs text-muted">Комнат</p>
              <p className="font-heading text-xl font-extrabold text-primary">{item.rooms}</p>
            </div>
            <div className="rounded-card bg-light p-4 text-center">
              <p className="text-xs text-muted">Срок</p>
              <p className="font-heading text-xl font-extrabold text-primary">{item.duration}</p>
            </div>
          </div>

          <p className="mt-6 text-lg text-ink/80">{item.description}</p>

          <h2 className="mt-6 text-lg font-bold">Что сделано</h2>
          <ul className="mt-3 space-y-2">
            {item.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-ink">
                <Check className="h-4 w-4 text-primary" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4 rounded-card-lg bg-gradient-primary p-6 text-white">
            <div>
              <p className="text-sm text-white/80">Стоимость под ключ</p>
              <p className="font-heading text-3xl font-extrabold">{item.price.toLocaleString('ru-RU')} BYN</p>
            </div>
            <Link href="/kalkulyator" className="ml-auto rounded-full bg-accent px-5 py-3 font-semibold text-ink shadow-glow transition hover:bg-accent-dark">
              Хочу так же
            </Link>
          </div>
        </div>
      </section>

      {/* Похожие кейсы */}
      <section className="container-x pb-16">
        <h2 className="flex items-center gap-2 text-2xl font-extrabold">
          Похожие работы <ArrowRight className="h-5 w-5 text-primary" />
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/portfolio/${r.slug}`} className="group rounded-card border border-mint bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <PlaceholderImage label={r.title} ratio="16/9" className="w-full rounded-b-none" />
              <h3 className="mt-3 font-bold text-ink transition group-hover:text-primary">{r.title}</h3>
              <p className="mt-1 text-sm text-muted">{r.city} · {r.area} м² · {r.price.toLocaleString('ru-RU')} BYN</p>
            </Link>
          ))}
        </div>
      </section>

      <SchemaService
        name={item.title}
        description={item.description}
        offersFrom={Math.round(item.price / item.area)}
        offersUnit="BYN/м²"
      />
      <LeadSection source={`portfolio/${item.slug}`} />
    </>
  );
}
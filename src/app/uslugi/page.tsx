import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, Hammer, Paintbrush, Palette, Droplets, ChefHat, ArrowRight, type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import SchemaFAQ from '@/components/seo/SchemaFAQ';
import { Accordion } from '@/components/ui/Accordion';
import services from '@/data/services.json';

export const metadata: Metadata = {
  title: 'Услуги по ремонту квартир в Минске и Гомеле — цены от 350 BYN/м²',
  description:
    'Полный список услуг по ремонту квартир: под ключ, капитальный, косметический, дизайн-проект, ванная, кухня. Цены и сроки для Минска и Гомеля.',
};

const ICONS: Record<string, LucideIcon> = { Home, Hammer, Paintbrush, Palette, Droplets, ChefHat };

const faqItems = [
  {
    question: 'С чего начать ремонт квартиры?',
    answer: 'Оставьте заявку — инженер бесплатно приедет на замер, составит смету и предложит оптимальный план работ под ваш бюджет.',
  },
  {
    question: 'Какие услуги входят в ремонт под ключ?',
    answer: 'Демонтаж, черновые работы, электрика, сантехника, чистовая отделка, уборка и вывоз мусора. Весь цикл работ под единым договором.',
  },
  {
    question: 'Можно ли заказать только один вид работ?',
    answer: 'Да, выполняем отдельные работы: укладка плитки, покраска, замена полов, ремонт ванной или кухни без полного цикла.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Услуги' }]} />
      <section className="container-x pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Услуги</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Услуги по ремонту квартир</h1>
          <p className="mt-4 text-lg text-muted">
            Работаю в Минске и Гомеле. Фиксированная смета и гарантия 3 года на все виды работ.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Home;
            return (
              <Card key={service.slug} interactive className="flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-bold">{service.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-mint/60 pt-4">
                  <span className="font-heading text-lg font-extrabold text-primary">
                    от {service.priceFrom} {service.priceUnit}
                  </span>
                  <Link href={`/uslugi/${service.slug}`} className="text-sm font-semibold text-primary">
                    Подробнее →
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-16">
        <SchemaFAQ items={faqItems} />
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold">Частые вопросы</h2>
          <div className="mt-8">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <LeadSection source="uslugi" />
      <div className="container-x flex justify-center pb-16">
        <Link href="/kalkulyator" className="group flex items-center gap-2 font-semibold text-primary">
          Рассчитать стоимость в калькуляторе <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
}
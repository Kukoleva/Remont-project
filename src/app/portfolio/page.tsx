import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import PortfolioList from '@/components/portfolio/PortfolioList';
import LeadSection from '@/components/sections/LeadSection';

export const metadata: Metadata = {
  title: 'Портфолио ремонта квартир — кейсы с ценами и сроками',
  description:
    'Портфолио ремонтов квартир в Минске и Гомеле: реальные кейсы с фото, ценами и сроками. Фильтры по городу и типу ремонта.',
  keywords: ['портфолио ремонта', 'кейсы ремонта квартир', 'ремонт квартир примеры', 'ремонт до после'],
};

export default function PortfolioPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Портфолио' }]} />
      <section className="container-x pt-8 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Портфолио</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Наши выполненные работы</h1>
          <p className="mt-4 text-lg text-muted">
            Каждый кейс — с реальной сметой и сроком.
          </p>
        </div>
      </section>

      <section className="container-x pb-16">
        <PortfolioList />
      </section>

      <LeadSection source="portfolio" />
    </>
  );
}
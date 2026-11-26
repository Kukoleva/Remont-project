import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Advantages from '@/components/sections/Advantages';
import ServicesPreview from '@/components/sections/ServicesPreview';
import WorkSteps from '@/components/sections/WorkSteps';
import CalculatorPreview from '@/components/sections/CalculatorPreview';
import Visualization3D from '@/components/sections/Visualization3D';
import PortfolioSlider from '@/components/sections/PortfolioSlider';
import VideoBlock from '@/components/sections/VideoBlock';
import ReviewsBlock from '@/components/sections/ReviewsBlock';
import BlogPreview from '@/components/sections/BlogPreview';
import FAQ from '@/components/sections/FAQ';
import LeadForm from '@/components/sections/LeadForm';
import SchemaLocalBusiness from '@/components/seo/SchemaLocalBusiness';
import SchemaService from '@/components/seo/SchemaService';
import SchemaReview from '@/components/seo/SchemaReview';
import { Check } from 'lucide-react';
import reviews from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Ремонт квартир под ключ в Минске и Гомеле за 45 дней — гарантия 3 года',
  description:
    'Ремонт квартир под ключ в Минске и Гомеле: фиксированная смета, срок от 45 дней, гарантия 3 года. Онлайн-калькулятор стоимости за 2 минуты.',
  keywords: [
    'ремонт квартир минск',
    'ремонт квартир гомель',
    'ремонт под ключ',
    'калькулятор ремонта',
    'ремонт квартир цена',
  ],
};

const leadBenefits = [
  'Бесплатный выезд инженера на замер',
  'Смета за 24 часа с разбивкой по позициям',
  'Фиксация цены в договоре на весь срок',
];

export default function HomePage() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <>
      {/* Schema.org для главной */}
      <SchemaLocalBusiness />
      <SchemaService
        name="Ремонт квартир под ключ"
        description="Ремонт квартир под ключ в Минске и Гомеле: фиксированная смета, срок от 45 дней, гарантия 3 года."
        offersFrom={550}
        offersUnit="BYN/м²"
      />
      <SchemaReview
        rating={Number(avg.toFixed(1))}
        count={reviews.length}
        reviews={reviews.map((r) => ({ author: r.author, date: r.date, text: r.text, rating: r.rating }))}
      />

      <Hero />
      <Advantages />
      <ServicesPreview />
      <WorkSteps />
      <CalculatorPreview />
      <Visualization3D />
      <PortfolioSlider />
      <VideoBlock />
      <ReviewsBlock />
      <BlogPreview />
      <FAQ />

      {/* Форма заявки */}
      <section className="section-pad bg-light">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Бесплатная консультация</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              Получите точную смету вашего ремонта
            </h2>
            <p className="mt-4 max-w-lg text-muted">
              Оставьте заявку — инженер перезвонит в течение 15 минут, ответит на вопросы
              и бесплатно приедет на замер.
            </p>
            <ul className="mt-6 space-y-3">
              {leadBenefits.map((b) => (
                <li key={b} className="flex items-center gap-3 font-medium text-ink">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm source="main" />
        </div>
      </section>
    </>
  );
}
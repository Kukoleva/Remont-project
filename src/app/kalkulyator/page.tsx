import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Calculator from '@/components/calculator/Calculator';
import LeadSection from '@/components/sections/LeadSection';
import SchemaFAQ from '@/components/seo/SchemaFAQ';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Калькулятор ремонта квартиры онлайн — расчёт стоимости за 2 минуты',
  description:
    'Онлайн-калькулятор ремонта квартиры: расчёт материалов и работ по площади, тип ремонта и класс материалов. Смета с разбивкой и отправкой в WhatsApp/Telegram.',
  keywords: ['калькулятор ремонта', 'расчёт стоимости ремонта', 'смета ремонта онлайн', 'стоимость ремонта калькулятор'],
};

const FAQ = [
  { question: 'Насколько точна смета калькулятора?', answer: 'Калькулятор даёт предварительную оценку ±10–15%. Точную смету подтвердит инженер после бесплатного замера.' },
  { question: 'Как считаются материалы?', answer: 'Обои — по формуле (периметр × высота − проёмы) / площадь рулона + 10% запаса. Плитка и ламинат — с запасом 5–10%, краска — по расходу на м² × количество слоёв.' },
  { question: 'Можно ли отправить смету себе?', answer: 'Да, после расчёта нажмите «Смета в WhatsApp» или «Смета в Telegram» — расчёт придёт текстом. Также доступен экспорт в PDF.' },
];

export default function CalculatorPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Калькулятор' }]} />
      <section className="bg-light pb-16">
        <div className="container-x pt-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Онлайн-расчёт</p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Калькулятор ремонта квартиры</h1>
            <p className="mt-4 text-lg text-muted">
              Выберите параметры — получите смету с разбивкой по материалам и работам,
              точный срок и стоимость под ключ.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x -mt-6 pb-16">
        <Calculator />
      </section>

      <section className="container-x pb-16">
        <SchemaFAQ items={FAQ} />
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold">Как работает расчёт</h2>
          <div className="mt-8">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>

      <LeadSection source="kalkulyator" />
    </>
  );
}
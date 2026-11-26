import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Публичная оферта',
  description: 'Публичная оферта частного мастера по ремонту квартир (ИП) в Минске и Гомеле.',
  robots: { index: false, follow: true },
};

export default function OfertaPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Публичная оферта' }]} />
      <article className="container-x max-w-3xl py-10 prose-remont">
        <h1 className="text-4xl font-extrabold">Публичная оферта</h1>
        <p className="text-muted">Дата публикации: 26.11.2026</p>

        <h2>1. Предмет оферты</h2>
        <p>
          {SITE.legalName}, именуемый «Исполнитель», предлагает услуги по ремонту квартир
          под ключ в Минске и Гомеле на условиях, изложенных в настоящей оферте и договоре подряда.
        </p>

        <h2>2. Порядок заключения договора</h2>
        <p>Акцептом оферты считается подписание договора подряда и внесение аванса. Все существенные условия — смета, сроки, гарантии — фиксируются в договоре.</p>

        <h2>3. Стоимость и оплата</h2>
        <p>Стоимость работ фиксируется в смете и не изменяется в процессе. Оплата производится поэтапно: аванс, черновые работы, чистовая отделка, сдача объекта.</p>

        <h2>4. Гарантии</h2>
        <p>На все выполненные работы действует гарантия 3 года с даты подписания акта приёмки. Гарантийные случаи устраняются бесплатно.</p>

        <h2>5. Реквизиты</h2>
        <p>{SITE.legalName}, телефон: {SITE.phone}, email: {SITE.email}. Работаю: {SITE.tagline}.</p>
      </article>
    </>
  );
}
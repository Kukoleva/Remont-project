import { Accordion } from '@/components/ui/Accordion';
import SchemaFAQ from '@/components/seo/SchemaFAQ';

const faqItems = [
  {
    question: 'Сколько стоит ремонт квартиры под ключ?',
    answer:
      'Стоимость зависит от площади, типа ремонта и материалов. Косметический — от 350 BYN/м², капитальный — от 650 BYN/м². Точную смету можно получить в онлайн-калькуляторе за 2 минуты.',
  },
  {
    question: 'Какие сроки выполнения работ?',
    answer:
      'Косметический ремонт занимает от 14 дней, капитальный — от 45 дней, дизайнерский — от 60 дней. Срок фиксируется в договоре, за просрочку платим мы.',
  },
  {
    question: 'Даёте ли вы гарантию на работы?',
    answer:
      'Да, на все работы действует гарантия 3 года. Гарантийные случаи устраняем бесплатно по первому обращению.',
  },
  {
    question: 'Работаете ли вы в Гомеле?',
    answer:
      'Да, работаю в Минске и Гомеле. Бесплатный выезд на замер в обоих городах, прайс единый.',
  },
  {
    question: 'Можно ли оплатить ремонт частями?',
    answer:
      'Да, оплата разбивается на этапы: аванс, черновые работы, чистовая отделка, сдача. Также доступна рассрочка до 24 месяцев через банки-партнёры.',
  },
];

/** FAQ на главной + Schema.org FAQPage */
export default function FAQ() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <SchemaFAQ items={faqItems} />
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Частые вопросы</h2>
          </div>
          <div className="mt-10">
            <Accordion items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
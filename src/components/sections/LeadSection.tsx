import { Check } from 'lucide-react';
import LeadForm from './LeadForm';

type Props = {
  title?: string;
  subtitle?: string;
  source: string;
};

/** Секция с формой заявки для внутренних страниц */
export default function LeadSection({
  title = 'Получите точную смету вашего ремонта',
  subtitle = 'Оставьте заявку — инженер перезвонит в течение 15 минут и бесплатно приедет на замер.',
  source,
}: Props) {
  const benefits = [
    'Бесплатный выезд инженера на замер',
    'Смета за 24 часа с разбивкой по позициям',
    'Фиксация цены в договоре на весь срок',
  ];

  return (
    <section className="section-pad bg-light">
      <div className="container-x grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Бесплатная консультация</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-muted">{subtitle}</p>
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 font-medium text-ink">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-primary">
                  <Check className="h-4 w-4" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm source={source} />
      </div>
    </section>
  );
}
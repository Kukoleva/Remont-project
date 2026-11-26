import { ShieldCheck, Clock, BadgeCheck, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

type Advantage = { icon: LucideIcon; title: string; text: string };

const items: Advantage[] = [
  {
    icon: ShieldCheck,
    title: 'Гарантия 3 года',
    text: 'Фиксируем гарантию в договоре. Бесплатно устраняем любой гарантийный случай.',
  },
  {
    icon: Clock,
    title: 'Сроки в договоре',
    text: 'Средний срок сдачи — 45 дней. За каждый день просрочки платим мы.',
  },
  {
    icon: BadgeCheck,
    title: 'Фиксированная смета',
    text: 'Цена не растёт в процессе. Все работы и материалы расписаны до подписания.',
  },
];

/** Преимущества */
export default function Advantages() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Почему мы</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Ремонт без стресса — это зона нашей ответственности
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} interactive className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint text-primary">
                <item.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
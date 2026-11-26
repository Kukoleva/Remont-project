import Link from 'next/link';
import { Star, ArrowRight, BadgeCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import reviews from '@/data/reviews.json';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-mint text-mint'}`}
        />
      ))}
    </div>
  );
}

/** Блок отзывов на главной: рейтинг + сетка */
export default function ReviewsBlock() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section className="section-pad bg-light">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Отзывы</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Нам доверяют ремонт</h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-heading text-4xl font-extrabold text-primary">{avg.toFixed(1)}</span>
              <div>
                <Stars rating={Math.round(avg)} />
                <p className="mt-1 text-sm text-muted">
                  {reviews.length}+ отзывов на Google и Яндекс.Картах
                </p>
              </div>
            </div>
          </div>
          <Link href="/otzyvy" className="group flex items-center gap-2 font-semibold text-primary">
            Все отзывы
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.slice(0, 4).map((r) => (
            <Card key={r.id} className="flex flex-col">
              <Stars rating={r.rating} />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/80">«{r.text}»</p>
              <div className="mt-4 flex items-center justify-between border-t border-mint/60 pt-3">
                <div>
                  <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                    {r.author}
                    {r.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </p>
                  <p className="text-xs text-muted">{r.city} · {r.service}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
import type { Metadata } from 'next';
import { Star, BadgeCheck, ExternalLink } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ReviewForm from '@/components/reviews/ReviewForm';
import SchemaReview from '@/components/seo/SchemaReview';
import { Card } from '@/components/ui/Card';
import { SITE } from '@/lib/constants';
import reviews from '@/data/reviews.json';

export const metadata: Metadata = {
  title: 'Отзывы о ремонте квартир в Минске и Гомеле',
  description:
    'Реальные отзывы клиентов о ремонте квартир в Минске и Гомеле: рейтинг, фото и оценки. Оставьте свой отзыв о нашей работе.',
  keywords: ['отзывы о ремонте', 'ремонт квартир отзывы', 'ремонт под ключ отзывы'],
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'fill-mint text-mint'}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const count5 = reviews.filter((r) => r.rating === 5).length;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Отзывы' }]} />
      <section className="container-x pt-8 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Отзывы</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Что говорят наши клиенты</h1>
          <p className="mt-4 text-lg text-muted">Каждый отзыв — реальный объект в Минске или Гомеле.</p>
        </div>

        {/* Рейтинг */}
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center rounded-card-lg bg-gradient-primary p-8 text-white shadow-lift sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-heading text-5xl font-extrabold">{avg.toFixed(1)}</p>
            <div className="mt-2 flex justify-center sm:justify-start"><Stars rating={Math.round(avg)} /></div>
          </div>
          <div className="mt-4 text-center sm:mt-0 sm:text-right">
            <p className="font-heading text-2xl font-extrabold">{count5} из {reviews.length}</p>
            <p className="text-sm text-white/80">отзывов с оценкой 5 из 5</p>
          </div>
        </div>

        {/* Сетка отзывов */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.id} className="flex flex-col">
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="text-xs text-muted">{new Date(r.date).toLocaleDateString('ru-RU')}</span>
              </div>
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

        {/* Внешние площадки */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-card border border-mint bg-light p-5 transition hover:bg-mint">
            <span className="font-semibold text-ink">Читать отзывы в Google Картах</span>
            <ExternalLink className="h-5 w-5 text-primary" />
          </a>
          <a href="https://yandex.by/maps" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-card border border-mint bg-light p-5 transition hover:bg-mint">
            <span className="font-semibold text-ink">Читать отзывы в Яндекс.Картах</span>
            <ExternalLink className="h-5 w-5 text-primary" />
          </a>
        </div>
      </section>

      {/* Форма отзыва */}
      <section className="section-pad bg-light">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Ваш опыт важен</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Оставьте отзыв о ремонте</h2>
            <p className="mt-4 max-w-lg text-muted">
              Расскажите, как прошёл ремонт в квартире. Ваш отзыв поможет другим выбрать
              надёжного мастера.
            </p>
          </div>
          <div className="rounded-card-lg bg-white p-6 shadow-lift md:p-8">
            <ReviewForm />
          </div>
        </div>
      </section>

      <SchemaReview
        rating={Number(avg.toFixed(1))}
        count={reviews.length}
        reviews={reviews.map((r) => ({ author: r.author, date: r.date, text: r.text, rating: r.rating }))}
      />
    </>
  );
}
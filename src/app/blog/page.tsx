import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock3, CalendarDays } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { cn } from '@/lib/cn';
import blog from '@/data/blog.json';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Блог о ремонте квартир — гайды, цены, ошибки, тренды 2025',
  description:
    'SEO-статьи о ремонте квартир: цены в Минске и Гомеле, гайды, типичные ошибки и тренды 2025 года. Практические советы от мастера с 12-летним опытом.',
  keywords: ['блог о ремонте', 'статьи о ремонте', 'ремонт квартир советы', 'тренды ремонта 2025'],
};

const PAGE_SIZE = 9;

const CATEGORIES = Array.from(new Set(blog.map((b) => b.category)));

function BlogContent({
  searchParams,
}: {
  searchParams?: { cat?: string; page?: string };
}) {
  const cat = searchParams?.cat;
  const page = Math.max(1, Number(searchParams?.page) || 1);

  const sorted = [...blog].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filtered = cat ? sorted.filter((b) => b.category === cat) : sorted;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Блог' }]} />
      <section className="container-x pt-8 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Блог</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Полезные статьи о ремонте</h1>
          <p className="mt-4 text-lg text-muted">
            Гайды, цены, ошибки и тренды — пишу на основе реальных объектов, а не копирую.
          </p>
        </div>

        {/* Фильтр по категориям */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Link
            href="/blog"
            aria-current={!cat ? 'page' : undefined}
            className={cn('rounded-full px-4 py-2 text-sm font-medium transition', !cat ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint')}
          >
            Все
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/blog?cat=${encodeURIComponent(c)}`}
              aria-current={cat === c ? 'page' : undefined}
              className={cn('rounded-full px-4 py-2 text-sm font-medium transition', cat === c ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint')}
            >
              {c}
            </Link>
          ))}
        </div>

        {/* Сетка статей */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <PlaceholderImage label={post.title} ratio="16/9" className="w-full rounded-b-none" />
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-mint px-3 py-1 font-medium text-primary">{post.category}</span>
                  <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {post.readingTime} мин</span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug transition group-hover:text-primary">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 border-t border-mint/60 pt-3 text-xs text-muted">
                  <CalendarDays className="h-3.5 w-3.5" /> {new Date(post.date).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <nav className="mt-10 flex justify-center gap-2" aria-label="Пагинация блога">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const href = `/blog?${cat ? `cat=${encodeURIComponent(cat)}&` : ''}page=${p}`;
              return (
                <Link
                  key={p}
                  href={href}
                  aria-current={page === p ? 'page' : undefined}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition',
                    page === p ? 'bg-primary text-white' : 'bg-light text-ink hover:bg-mint',
                  )}
                >
                  {p}
                </Link>
              );
            })}
          </nav>
        )}
      </section>

      <LeadSection
        title="Получите бесплатную смету вашего ремонта"
        subtitle="Отвечу на вопросы о ценах, сроках и материалах именно для вашей квартиры."
        source="blog"
      />
    </>
  );
}
export default function BlogPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Загрузка блога...</div>}>
      <BlogContent />
    </Suspense>
  );
}
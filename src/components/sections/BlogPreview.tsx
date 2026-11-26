import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import blog from '@/data/blog.json';

/** Дайджест свежих статей блога на главной */
export default function BlogPreview() {
  const latest = [...blog]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Блог</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Полезные статьи о ремонте</h2>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 font-semibold text-primary">
            Все статьи
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <PlaceholderImage label={post.title} ratio="16/9" className="w-full rounded-b-none" />
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-mint px-3 py-1 font-medium text-primary">{post.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" /> {post.readingTime} мин
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug transition group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-1 border-t border-mint/60 pt-3 text-xs text-muted">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
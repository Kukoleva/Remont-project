import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, Clock3, User } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadSection from '@/components/sections/LeadSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/constants';
import blog from '@/data/blog.json';

//export const dynamic = 'force-dynamic';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return blog.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = blog.find((b) => b.slug === params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: 'article',
    publishedTime: post.date,
  });
}

export default function BlogPost({ params }: Params) {
  const post = blog.find((b) => b.slug === params.slug);
  if (!post) notFound();

  const related = blog.filter((b) => b.slug !== post.slug && (b.category === post.category || b.tags.some((t) => post.tags.includes(t)))).slice(0, 3);
  const fallback = blog.filter((b) => b.slug !== post.slug).slice(0, 3);
  const others = related.length ? related : fallback;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: `${SITE.url}/favicon.svg` } },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <Breadcrumbs items={[{ label: 'Блог', href: '/blog' }, { label: post.title }]} />

      <article className="container-x max-w-3xl py-10">
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
          <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {new Date(post.date).toLocaleDateString('ru-RU')}</span>
          <span className="flex items-center gap-1"><Clock3 className="h-4 w-4" /> {post.readingTime} мин чтения</span>
        </div>

        <div className="mt-6">
          <PlaceholderImage label={post.title} ratio="16/9" className="w-full" />
        </div>

        <p className="mt-8 text-lg font-medium leading-relaxed text-ink">{post.excerpt}</p>

        <div className="prose-remont mt-6">
          {post.sections.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}
        </div>

        {/* Теги */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t} href={`/blog?cat=${encodeURIComponent(post.category)}`} className="rounded-full bg-light px-3 py-1 text-xs font-medium text-muted transition hover:text-primary">
              #{t}
            </Link>
          ))}
        </div>
      </article>

      {/* Читайте также */}
      <section className="container-x pb-16">
        <h2 className="text-2xl font-extrabold">Читайте также</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((b) => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="group rounded-card border border-mint bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <span className="text-xs font-medium text-primary">{b.category}</span>
              <h3 className="mt-2 font-bold leading-snug text-ink transition group-hover:text-primary">{b.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <LeadSection source={`blog/${post.slug}`} />
    </>
  );
}
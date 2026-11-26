import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/constants';

export type Crumb = { label: string; href?: string };

/** Хлебные крошки + Schema.org BreadcrumbList */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ label: 'Главная', href: '/' }, ...items];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? `${SITE.url}${c.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Хлебные крошки" className="container-x py-4">
      <JsonLd data={ld} />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {last ? (
                <span className="font-medium text-ink" aria-current="page">{c.label}</span>
              ) : c.href ? (
                <Link href={c.href} className="transition hover:text-primary">{c.label}</Link>
              ) : (
                <span>{c.label}</span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-muted/60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
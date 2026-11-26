import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import services from '@/data/services.json';
import blog from '@/data/blog.json';
import portfolio from '@/data/portfolio.json';

/**
 * Автоматическая генерация sitemap.xml (App Router).
 * Статические страницы + ЧПУ услуг, статей блога, кейсов портфолио.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const today = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: today, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/uslugi`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/kalkulyator`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/3d-vizualizaciya`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/video`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/otzyvy`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: today, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/o-nas`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/kontakty`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/politika`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/oferta`, lastModified: today, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const servicesPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/uslugi/${s.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = blog.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: b.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolio.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...servicesPages, ...blogPages, ...portfolioPages];
}
import type { Metadata } from 'next';
import { SITE } from './constants';

/**
 * Хелперы для построения SEO-метаданных страниц.
 * Единый формат title (до 60), description (до 155), canonical, OG, Twitter.
 */

type BuildMetaArgs = {
  title: string;
  description: string;
  path: string;
  /** ключевые слова (опционально) */
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = SITE.ogImage,
  type = 'website',
  publishedTime,
}: BuildMetaArgs): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const fullDescription =
    description.length > 155 ? `${description.slice(0, 152)}...` : description;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords,
    alternates: {
      canonical: url,
      languages: {
        'ru-BY': url,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: SITE.name,
      locale: 'ru_BY',
      type,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
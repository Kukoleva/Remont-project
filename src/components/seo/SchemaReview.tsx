import { JsonLd } from './JsonLd';
import { SITE } from '@/lib/constants';

type Review = { author: string; date: string; text: string; rating: number };

type Props = {
  /** средний рейтинг */
  rating: number;
  /** количество отзывов */
  count: number;
  reviews?: Review[];
};

/** Schema.org Review + AggregateRating — звёзды в сниппете поиска */
export default function SchemaReview({ rating, count, reviews = [] }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE.name,
    url: SITE.url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
    })),
  };

  return <JsonLd data={data} />;
}
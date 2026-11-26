import { JsonLd } from './JsonLd';
import { SITE } from '@/lib/constants';

/**
 * Schema.org LocalBusiness (частный мастер, без адреса).
 * Ключевой блок для локального SEO.
 */
export default function SchemaLocalBusiness() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE.url}#business`,
    name: SITE.name,
    image: `${SITE.url}/favicon.svg`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$',
    openingHours: 'Mo-Sa 09:00-20:00',
    areaServed: ['Минск', 'Гомель'],
  };

  return <JsonLd data={data} />;
}
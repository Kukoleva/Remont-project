import { JsonLd } from './JsonLd';
import { SITE } from '@/lib/constants';

type Props = {
  name: string;
  description: string;
  offersFrom?: number;
  offersUnit?: string;
};

/** Schema.org Service — разметка конкретной услуги */
export default function SchemaService({ name, description, offersFrom, offersUnit }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE.name,
      telephone: SITE.phone,
      url: SITE.url,
    },
    areaServed: ['Минск', 'Гомель'],
    ...(offersFrom
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'BYN',
            price: offersFrom,
            description: `Стоимость от ${offersFrom} ${offersUnit ?? ''}`.trim(),
          },
        }
      : {}),
  };

  return <JsonLd data={data} />;
}
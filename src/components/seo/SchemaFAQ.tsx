import { JsonLd } from './JsonLd';

export type FaqItem = { question: string; answer: string };

/** Schema.org FAQPage — для расширенных сниппетов в поиске */
export default function SchemaFAQ({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
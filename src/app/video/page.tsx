import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import VideoGrid from '@/components/video/VideoGrid';
import LeadSection from '@/components/sections/LeadSection';
import SchemaService from '@/components/seo/SchemaService';

export const metadata: Metadata = {
  title: 'Видео ремонтов квартир — обзоры, таймлапсы, советы',
  description:
    'Видео работ по ремонту квартир в Минске и Гомеле: таймлапсы, обзоры объектов, Shorts и практические советы. Смотрите процесс своими глазами.',
  keywords: ['видео ремонта', 'таймлапс ремонт', 'обзор ремонта', 'ремонт квартир видео'],
};

export default function VideoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Видео' }]} />
      <section className="container-x pt-8 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Видео</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">Видео наших работ</h1>
          <p className="mt-4 text-lg text-muted">
            Таймлапсы, обзоры и короткие ролики: как проходит ремонт и что получается в итоге.
          </p>
        </div>
      </section>

      <section className="container-x pb-16">
        <VideoGrid />
      </section>

      <SchemaService
        name="Видео работ по ремонту"
        description="Видео работ по ремонту квартир: таймлапсы, обзоры объектов и Shorts."
      />
      <LeadSection source="video" />
    </>
  );
}
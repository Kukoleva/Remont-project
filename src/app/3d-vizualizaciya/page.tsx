import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import VisualizationViewer from '@/components/three/VisualizationViewer';
import LeadSection from '@/components/sections/LeadSection';
import SchemaService from '@/components/seo/SchemaService';

export const metadata: Metadata = {
  title: '3D-визуализация квартиры онлайн — интерактивные сцены интерьера',
  description:
    'Интерактивная 3D-визуализация квартиры: вращайте сцену, переключайте отделку и материалы в реальном времени. Закажите 3D-проект ремонта в Минске и Гомеле.',
  keywords: ['3d визуализация квартиры', '3d проект интерьера', 'дизайн интерьера 3d', 'визуализация ремонта'],
};

export default function VisualizationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: '3D-визуализация' }]} />
      <section className="container-x pt-8 text-center">
        <p className="eyebrow">3D-визуализация</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold md:text-5xl">
          Увидьте будущий интерьер до начала ремонта
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Интерактивная 3D-сцена квартиры. Переключайте материалы отделки,
          вращайте и приближайте — как будто вы уже в новой квартире.
        </p>
      </section>

      <VisualizationViewer />

      <SchemaService
        name="3D-визуализация квартиры"
        description="Интерактивная 3D-визуализация квартиры: переключение отделки и материалов, вращение и зум сцены."
        offersFrom={45}
        offersUnit="BYN/м²"
      />
      <LeadSection
        title="Хочу такой ремонт"
        subtitle="Оставьте заявку — сделаем 3D-визуализацию вашей планировки и точную смету."
        source="3d-vizualizaciya"
      />
    </>
  );
}
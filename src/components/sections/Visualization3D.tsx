import Image from 'next/image';
import Link from 'next/link';
import { Box, Rotate3d, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Единственное «живое» фото из интернета — постер для 3D-визуализации (Unsplash)
const POSTER = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';

/** Превью 3D-визуализации на главной: интерактивная сцена доступна на отдельной странице */
export default function Visualization3D() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="relative order-2 overflow-hidden rounded-card-lg shadow-lift lg:order-1">
          <div className="aspect-[4/3] w-full">
            <Image
              src={POSTER}
              alt="3D-визуализация современной квартиры после ремонта"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-primary shadow-card">
            <Rotate3d className="h-4 w-4" /> Интерактивная 3D-сцена
          </span>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow">3D-визуализация</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Увидьте будущий ремонт до начала работ
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Интерактивная 3D-сцена квартиры: вращайте, приближайте и переключайте
            варианты отделки и материалов в реальном времени.
          </p>

          <ul className="mt-6 space-y-3">
            {['Вращение и зум в 3D', 'Переключение отделки и материалов', 'Реалистичные текстуры'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink">
                <Box className="h-5 w-5 text-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <Button href="/3d-vizualizaciya" size="lg" className="mt-8">
            Открыть 3D-визуализацию <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
import Link from 'next/link';
import {
  Home,
  Hammer,
  Paintbrush,
  Palette,
  Droplets,
  ChefHat,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import services from '@/data/services.json';

const ICONS: Record<string, LucideIcon> = {
  Home,
  Hammer,
  Paintbrush,
  Palette,
  Droplets,
  ChefHat,
};

/** Карточки услуг на главной */
export default function ServicesPreview() {
  return (
    <section className="section-pad bg-light">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Услуги</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
              Все виды ремонта квартир под ключ
            </h2>
          </div>
          <Link href="/uslugi" className="group flex items-center gap-2 font-semibold text-primary">
            Все услуги
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Home;
            return (
              <Card key={service.slug} interactive className="flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-mint/60 pt-4">
                  <div>
                    <span className="font-heading text-lg font-extrabold text-primary">
                      от {service.priceFrom}
                    </span>
                    <span className="text-xs text-muted"> {service.priceUnit}</span>
                  </div>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="text-sm font-semibold text-primary transition hover:text-primary-dark"
                  >
                    Подробнее →
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
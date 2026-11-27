'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const stats = [
  { icon: ShieldCheck, value: '3 года', label: 'гарантии по договору' },
  { icon: Clock, value: '45 дней', label: 'средний срок сдачи' },
  { icon: Award, value: '250+', label: 'сданных объектов' },
];

/** Главный экран: оффер, CTA и блок доверия */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-light">
      {/* декоративные размытия */}
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mint blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="container-x relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:py-24">
        {/* Текст */}
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Минск · Гомель — ремонт квартир под ключ
          </motion.p>

          <motion.h1
            className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Ремонт квартир под ключ в Минске и Гомеле{' '}
            <span className="text-primary">за 45 дней</span> — с гарантией 3 года
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-lg text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Фиксированная смета в договоре и персональный контроль каждого этапа.
            Без скрытых доплат, срывов сроков и «сюрпризов» в конце.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Button href="/kalkulyator" size="lg">
              Рассчитать стоимость <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/portfolio" variant="white" size="lg">
              Смотреть работы
            </Button>
          </motion.div>

          {/* Блок доверия */}
          <motion.div
            className="mt-10 grid grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-card bg-white p-4 text-center shadow-card">
                <s.icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 font-heading text-xl font-extrabold text-ink sm:text-2xl">{s.value}</p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Визуал */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card-lg shadow-lift">
            <Image
              src="/1.png"
              alt="Ремонт квартиры под ключ — пример готовой гостиной"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-card bg-white p-4 shadow-lift sm:block">
            <p className="text-sm font-semibold text-ink">Фикс-цена в договоре</p>
            <p className="text-xs text-muted">не меняются цены в процессе</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
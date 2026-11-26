# Ремонт Квартир — сайт ремонта квартир (Минск · Гомель)

Многостраничный корпоративный сайт по ремонту квартир под ключ с приоритетом на SEO,
локальный поиск и конверсию. Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
React Three Fiber.

## 🚀 Запуск

```bash
npm install
npm run dev        # разработка → http://localhost:3000
npm run build      # production-сборка
npm run start      # запуск после сборки
```

## ⚙️ Переменные окружения

Скопируйте `.env.local` и заполните реальными значениями:

| Переменная | Назначение |
| --- | --- |
| `DATABASE_URL` | PostgreSQL для Prisma (заявки/отзывы) |
| `NEXT_PUBLIC_SITE_URL` | Домен сайта (canonical) |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Пуш заявок в Telegram |
| `CRM_WEBHOOK_URL` | Webhook Bitrix24 / amoCRM |
| `RECAPTCHA_SECRET` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | Яндекс.Метрика |

## 📁 Структура

```
src/
├── app/            # страницы App Router (главная, услуги, калькулятор, 3D, портфолио, …)
│   └── api/        # роуты: lead, calculator, reviews
├── components/     # layout, ui, sections, calculator, three, seo, portfolio, video, reviews
├── lib/            # calculator.ts (расчёт), notify.ts, prices.json, materials.json, …
├── data/           # services, portfolio, reviews, videos, blog (20 статей)
├── hooks/          # useCalculator, useMediaQuery, useScroll
├── types/          # TypeScript-типы
prisma/schema.prisma
```

## 🔍 SEO

- Автогенерация `sitemap.xml` и `robots.txt` (App Router `sitemap.ts` / `robots.ts`).
- Уникальные `title`/`description` через `buildMetadata()` (`src/lib/seo.ts`).
- Schema.org: `LocalBusiness`, `Service`, `FAQPage`, `Review`, `Article`, `BreadcrumbList`.
- Хлебные крошки на всех внутренних страницах, внутренняя перелинковка («Похожие услуги», «Читайте также»).

## 🧮 Калькулятор

Логика — `src/lib/calculator.ts` + `prices.json` (прайс работ) + `materials.json` (классы материалов).
Формулы: обои `(периметр×высота−проёмы)/рулон×1.1`, плитка `×1.1`, ламинат `×1.05`,
краска `расход×слои`, стяжка/штукатурка/ГКЛ — по нормативам. Экспорт в PDF через `window.print()`.

## 🖼 Заглушки медиа

По требованию проекта все фотографии заменены на заглушки (`components/ui/PlaceholderImage`).
Единственное «живое» фото из интернета — постер 3D-визуализации (Unsplash).

### ⚠️ Что заменить перед запуском в прод

1. **ID видео YouTube** — в `src/data/videos.json` стоят плейсхолдеры `dQw4w9WgXcQ`.
2. **Реальные фото** — замените `PlaceholderImage` на `next/image` + файлы в `public/images/*`.
3. **Телефон / email** — `src/lib/constants.ts` (`SITE`).
4. **Prisma** — после установки БД выполните `npm run prisma:generate`.

## 🚀 Деплой

Подключите репозиторий к Vercel, задайте env-переменные → автоматический деплой.
CDN, WebP/AVIF и Core Web Vitals оптимизированы из коробки (lazy-load, `next/image`, шрифты с `display=swap`).
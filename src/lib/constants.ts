/**
 * Глобальные константы: контакты, города работы, ссылки.
 * NAP-консистентность (Name, Address, Phone) критична для локального SEO.
 */

export const SITE = {
  name: 'Ремонт Квартир',
  legalName: 'ИП, УНП 491853269',
  tagline: 'Ремонт квартир под ключ в Минске и Гомеле',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://remont-minsk-gomel.by',
  email: 'wiktormocart1856@gmail.com',
  phone: '+375 25 666-94-09',
  phoneHref: 'tel:+37525666094',
  telegram: '@wiktormocart',
  telegramUrl: 'https://t.me/wiktormocart',
  whatsappUrl: 'https://wa.me/37525666094',
  viberUrl: 'viber://chat?number=%2B37525666094',
  hours: 'Пн–Сб 9:00–20:00',
  ogImage: '/og-image.jpg',
  social: {
    instagram: 'https://instagram.com/remontprofi.by',
    youtube: 'https://youtube.com/@remontprofi',
  },
} as const;

/** Города, где работаем (для локального SEO) */
export const CITIES = ['Минск', 'Гомель'] as const;

/** Ссылки на связанные сайты */
export const RELATED_SITES = [
  { href: 'https://vdomeremont.by', label: 'vdomeremont.by' },
  { href: 'https://kukoleva.github.io/remont-gomel/', label: 'kukoleva.github.io/remont-gomel' },
] as const;

export const NAV_LINKS = [
  { href: '/uslugi', label: 'Услуги' },
  { href: '/kalkulyator', label: 'Калькулятор' },
  { href: '/3d-vizualizaciya', label: '3D-визуализация' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/video', label: 'Видео' },
  { href: '/otzyvy', label: 'Отзывы' },
  { href: '/blog', label: 'Блог' },
  { href: '/o-nas', label: 'О нас' },
  { href: '/kontakty', label: 'Контакты' },
] as const;
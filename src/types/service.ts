export type Service = {
  slug: string;
  title: string;
  /** краткое описание для карточек */
  description: string;
  priceFrom: number;
  priceUnit: string;
  duration: string;
  icon: string;
  features: string[];
  /** SEO-кластеры, на которые заточена страница */
  seoKeywords: string[];
  h1: string;
  seoDescription: string;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  city: 'Минск' | 'Гомель';
  type: string;
  area: number;
  rooms: number;
  price: number;
  duration: string;
  description: string;
  features: string[];
  tags: string[];
};

export type ReviewItem = {
  id: string;
  author: string;
  city: 'Минск' | 'Гомель';
  rating: number;
  date: string;
  text: string;
  service: string;
  source: 'google' | 'yandex' | 'site';
  verified?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: number;
  author: string;
  imageKey: string;
  sections: { h: string; p: string }[];
};

export type VideoItem = {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  city: 'Минск' | 'Гомель' | 'Все';
};
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendToTelegram } from '@/lib/notify';
import { getDb } from '@/lib/db';
import reviews from '@/data/reviews.json';

export const runtime = 'nodejs';

const reviewSchema = z.object({
  author: z.string().min(2).max(60),
  city: z.enum(['Минск', 'Гомель', 'Другое']),
  rating: z.number().min(1).max(5),
  text: z.string().min(10).max(1500),
  service: z.string().max(100).optional(),
  contact: z.string().max(100).optional(),
});

/** Список отзывов (для виджетов/API) */
export async function GET() {
  return NextResponse.json({ ok: true, reviews });
}

/** Создание нового отзыва (после модерации публикуется вручную) */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }
  const data = parsed.data;

  await sendToTelegram(
    `⭐ Новый отзыв:\n👤 ${data.author} (${data.city})\n⭐ ${data.rating}/5\n💬 ${data.text.slice(0, 500)}`,
  );

  // Опционально сохраняем в БД через Prisma
  const db = await getDb();
  if (db) {
    await db.review.create({
      data: {
        author: data.author,
        city: data.city,
        rating: data.rating,
        text: data.text,
        service: data.service ?? '',
        moderated: false,
      },
    });
    await db.$disconnect();
  }

  return NextResponse.json({ ok: true });
}
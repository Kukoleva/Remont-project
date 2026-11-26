import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyRecaptcha, sendToTelegram, sendToCrm, formatLeadMessage } from '@/lib/notify';
import { getDb } from '@/lib/db';
import type { LeadPayload } from '@/types/review';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(9).max(18),
  message: z.string().max(2000).optional(),
  source: z.string().max(100).default('main'),
  website: z.string().optional(),
  recaptchaToken: z.string().optional(),
  page: z.string().max(200).optional(),
});

// Простой in-memory rate-limiter (5 заявок / 10 мин с одного IP)
const attempts = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 10 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }
  const data: LeadPayload = parsed.data;

  // honeypot: бот заполнил скрытое поле — игнорируем
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const captchaOk = await verifyRecaptcha(data.recaptchaToken);
  if (!captchaOk) {
    return NextResponse.json({ ok: false, error: 'recaptcha' }, { status: 400 });
  }

  const message = formatLeadMessage(data);

  // Уведомления (best-effort, параллельно)
  const [telegramOk, crmOk] = await Promise.all([
    sendToTelegram(message),
    sendToCrm({ event: 'lead', ...data }),
  ]);

  // Опционально сохраняем в БД (Prisma). Безопасно, если БД не настроена.
  const db = await getDb();
  if (db) {
    await db.lead.create({
      data: { name: data.name, phone: data.phone, source: data.source, message: data.message ?? '' },
    });
    await db.$disconnect();
  }

  return NextResponse.json({ ok: true, telegram: telegramOk, crm: crmOk });
}
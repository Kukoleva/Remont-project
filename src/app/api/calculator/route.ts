import { NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateEstimate, formatBYN } from '@/lib/calculator';
import { sendToTelegram } from '@/lib/notify';

export const runtime = 'nodejs';

const inputSchema = z.object({
  area: z.number().min(15).max(500),
  rooms: z.number().min(1).max(6),
  bathroom: z.enum(['sovmeshchenny', 'razdelny']),
  ceilingHeight: z.number().min(2.2).max(4),
  renovationType: z.enum(['kosmeticheskij', 'kapitalnyj', 'evro']),
  materialClass: z.enum(['econom', 'standard', 'premium']),
  designProject: z.boolean(),
  works: z.array(z.string()),
  contact: z.string().optional(),
});

/**
 * Серверная проверка расчёта сметы + (опционально) отправка заявки.
 * Используется как источник доверия для клиентского калькулятора.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  }

  const { contact, ...input } = parsed.data;
  const result = calculateEstimate(input);

  if (contact) {
    await sendToTelegram(
      `🧮 Заявка-смета:\n📞 ${contact}\n💰 Итого: ${formatBYN(result.grandTotal)}\n⏱ Срок: ~${result.durationDays} дней`,
    );
  }

  return NextResponse.json({ ok: true, result });
}
/**
 * Ленивый доступ к Prisma (PostgreSQL).
 * Клиент не обязателен для работы: заявки и отзывы в любом случае
 * уходят в Telegram/CRM. Если БД не настроена или клиент не сгенерирован —
 * возвращаем null, а вызывающий код мягко игнорирует сохранение.
 */

type PrismaLike = {
  lead: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  review: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  $disconnect: () => Promise<void>;
};

let client: PrismaLike | null = null;

export async function getDb(): Promise<PrismaLike | null> {
  if (client) return client;
  try {
    const mod = (await import('@prisma/client')) as unknown as {
      PrismaClient?: new () => PrismaLike;
    };
    if (!mod.PrismaClient) return null;
    client = new mod.PrismaClient();
    return client;
  } catch {
    return null;
  }
}
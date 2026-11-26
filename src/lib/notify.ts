/**
 * Серверные хелперы уведомлений и интеграций.
 * Заявки уходят в Telegram-бот + CRM (webhook Bitrix24/amoCRM).
 * Все функции `best-effort`: сбой отправки не роняет заявку.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Пуш-уведомление новой заявки в Telegram (бот @wiktormocart) */
export async function sendToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 4000),
        parse_mode: 'HTML',
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Вебхук в CRM (Bitrix24 / amoCRM) */
export async function sendToCrm(payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Проверка Google reCAPTCHA v3. Если ключ не задан — пропускаем. */
export async function verifyRecaptcha(token?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    const json = (await res.json()) as { success?: boolean; score?: number };
    return Boolean(json.success) && (json.score ?? 1) >= 0.5;
  } catch {
    return false;
  }
}

/** Формирует HTML-текст заявки для Telegram */
export function formatLeadMessage(data: {
  name: string;
  phone: string;
  source: string;
  message?: string;
  page?: string;
}): string {
  const rows = [
    '🏠 <b>Новая заявка с сайта</b>',
    `👤 Имя: ${escapeHtml(data.name)}`,
    `📞 Телефон: ${escapeHtml(data.phone)}`,
    `📄 Форма: ${escapeHtml(data.source)}`,
  ];
  if (data.message) rows.push(`💬 Сообщение: ${escapeHtml(data.message)}`);
  if (data.page) rows.push(`🔗 Страница: ${escapeHtml(data.page)}`);
  return rows.join('\n');
}
/**
 * Аналитика: Google Analytics 4 + Яндекс.Метрика.
 * Трекинг целей/событий — заявки, звонки, клики по мессенджерам.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ym?: (id: number, action: string, target?: string, params?: unknown) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || 0;

type EventParams = Record<string, string | number | boolean | undefined>;

/** Отправка события в GA4 + Яндекс.Метрику */
export function trackEvent(action: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;

  if (window.gtag && GA_ID) {
    window.gtag('event', action, params);
  }
  if (window.ym && YM_ID) {
    window.ym(YM_ID, 'reachGoal', action, params);
  }
}

/** Конверсионные события (цели на заявки) */
export const trackLeadSubmit = (method: string) => trackEvent('lead_submit', { method });
export const trackCallClick = () => trackEvent('call_clicked');
export const trackMessengerClick = (messenger: string) =>
  trackEvent('messenger_clicked', { messenger });
export const trackCalculatorSent = (channel: 'whatsapp' | 'telegram') =>
  trackEvent('calculator_sent', { channel });
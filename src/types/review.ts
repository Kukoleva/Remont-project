/** Данные формы отзыва (создание через API) */
export type ReviewFormValues = {
  author: string;
  city: 'Минск' | 'Гомель' | 'Другое';
  rating: number;
  text: string;
  service?: string;
  contact?: string;
};

/** Заявка с сайта (форма «Оставить заявку») */
export type LeadPayload = {
  name: string;
  phone: string;
  /** тип формы: главная / калькулятор / портфолио */
  source: string;
  message?: string;
  /** honeypot-поле, должно быть пустым */
  website?: string;
  /** токен reCAPTCHA v3 */
  recaptchaToken?: string;
  page?: string;
};
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { trackLeadSubmit } from '@/lib/analytics';

const schema = z.object({
  name: z.string().min(2, 'Укажите имя (минимум 2 символа)'),
  phone: z
    .string()
    .min(9, 'Введите номер телефона')
    .regex(/^[+]?[\d\s()-]{9,18}$/, 'Некорректный номер'),
  message: z.string().optional(),
  // honeypot-поле — должно остаться пустым
  website: z.string().optional(),
  agree: z.boolean().refine((v) => v === true, 'Необходимо согласие на обработку данных'),
});

type FormValues = z.infer<typeof schema>;

type LeadFormProps = {
  source?: string;
  variant?: 'card' | 'plain';
};

/** Форма заявки: валидация, антиспам (honeypot), отправка в /api/lead */
export default function LeadForm({ source = 'main', variant = 'card' }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { agree: false, website: '' },
  });

  const onSubmit = async (data: FormValues) => {
    // антиспам: если honeypot заполнен — тихо игнорируем
    if (data.website) {
      reset();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message,
          source,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      if (!res.ok) throw new Error('server error');

      trackLeadSubmit(source);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const content = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* honeypot */}
      <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="lead-name" label="Ваше имя" placeholder="Иван" {...register('name')} error={errors.name?.message} />
        <Input
          id="lead-phone"
          label="Телефон"
          type="tel"
          placeholder="+375 25 666-94-09"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-1.5 block text-sm font-medium text-ink">
          Что нужно отремонтировать? (необязательно)
        </label>
        <textarea
          id="lead-message"
          rows={3}
          placeholder="Квартира 54 м², капитальный ремонт…"
          {...register('message')}
          className="w-full rounded-xl border border-mint bg-light px-4 py-3 text-sm text-ink placeholder:text-muted transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-muted">
        <input type="checkbox" {...register('agree')} className="mt-0.5 h-4 w-4 accent-[#0F7B4E]" />
        <span>
          Соглашаюсь с{' '}
          <a href="/politika" className="text-primary underline">политикой конфиденциальности</a> и обработкой
          персональных данных
        </span>
      </label>
      {errors.agree && <p className="text-xs text-red-500">{errors.agree.message}</p>}

      {status === 'success' ? (
        <div className="flex items-center gap-2 rounded-xl bg-mint p-4 text-sm font-medium text-primary">
          <CheckCircle2 className="h-5 w-5" /> Спасибо! Мы свяжемся с вами в течение 15 минут.
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-ink shadow-glow transition hover:bg-accent-dark disabled:opacity-60"
        >
          {status === 'loading' ? 'Отправка…' : (
            <>
              Получить расчёт бесплатно <Send className="h-4 w-4" />
            </>
          )}
        </button>
      )}
      {status === 'error' && (
        <p className="text-center text-sm text-red-500">
          Не удалось отправить. Позвоните нам: +375 25 666-94-09
        </p>
      )}
    </form>
  );

  if (variant === 'plain') return content;

  return (
    <div className="rounded-card-lg bg-white p-6 shadow-lift md:p-8">{content}</div>
  );
}
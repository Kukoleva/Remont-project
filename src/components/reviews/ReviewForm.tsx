'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

const schema = z.object({
  author: z.string().min(2, 'Укажите имя'),
  city: z.enum(['Минск', 'Гомель', 'Другое']),
  rating: z.number().min(1, 'Поставьте оценку').max(5),
  text: z.string().min(10, 'Расскажите подробнее (минимум 10 символов)'),
  service: z.string().optional(),
  contact: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/** Форма «Оставить отзыв» */
export default function ReviewForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 5, city: 'Минск' },
  });

  const rating = watch('rating');

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('server error');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <p className="mb-2 text-sm font-medium text-ink">Ваша оценка</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setValue('rating', n)}
              aria-label={`Оценка ${n} из 5`}
              className="transition hover:scale-110"
            >
              <Star className={cn('h-7 w-7', n <= rating ? 'fill-amber-400 text-amber-400' : 'fill-mint text-mint')} />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="rev-author" label="Имя" placeholder="Ваше имя" {...register('author')} error={errors.author?.message} />
        <div className="space-y-1.5">
          <label htmlFor="rev-city" className="block text-sm font-medium text-ink">Город</label>
          <select
            id="rev-city"
            {...register('city')}
            className="w-full rounded-xl border border-mint bg-light px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none"
          >
            <option value="Минск">Минск</option>
            <option value="Гомель">Гомель</option>
            <option value="Другое">Другое</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rev-text" className="mb-1.5 block text-sm font-medium text-ink">Отзыв</label>
        <textarea
          id="rev-text"
          rows={4}
          placeholder="Расскажите о вашем опыте…"
          {...register('text')}
          className={cn(
            'w-full rounded-xl border border-mint bg-light px-4 py-3 text-sm text-ink placeholder:text-muted transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
            errors.text && 'border-red-400',
          )}
        />
        {errors.text && <p className="mt-1 text-xs text-red-500">{errors.text.message}</p>}
      </div>

      <Input id="rev-service" label="Услуга (необязательно)" placeholder="Капитальный ремонт" {...register('service')} />

      {status === 'success' ? (
        <div className="flex items-center gap-2 rounded-xl bg-mint p-4 text-sm font-medium text-primary">
          <CheckCircle2 className="h-5 w-5" /> Спасибо! Отзыв появится после модерации.
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white shadow-card transition hover:bg-primary-dark disabled:opacity-60"
        >
          {status === 'loading' ? 'Отправка…' : (<>Отправить отзыв <Send className="h-4 w-4" /></>)}
        </button>
      )}
      {status === 'error' && <p className="text-sm text-red-500">Не удалось отправить. Попробуйте ещё раз.</p>}
    </form>
  );
}
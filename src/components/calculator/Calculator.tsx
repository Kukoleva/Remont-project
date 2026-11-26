'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useCalculator } from '@/hooks/useCalculator';
import RoomStep from './RoomStep';
import MaterialStep from './MaterialStep';
import PriceStep from './PriceStep';
import ResultStep from './ResultStep';

const STEPS = ['Параметры', 'Тип ремонта', 'Работы', 'Смета'];

/** Многошаговый калькулятор стоимости ремонта */
export default function Calculator() {
  const [step, setStep] = useState(0);
  const { input, update, toggleWork, result, reset } = useCalculator();

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="rounded-card-lg bg-white shadow-lift">
      {/* Индикатор шагов */}
      <div className="border-b border-mint px-6 py-5">
        <ol className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                onClick={() => setStep(i)}
                aria-current={i === step ? 'step' : undefined}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition',
                  i < step
                    ? 'bg-primary text-white'
                    : i === step
                      ? 'bg-accent text-ink'
                      : 'bg-light text-muted',
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              <span
                className={cn(
                  'hidden text-sm font-medium sm:block',
                  i === step ? 'text-ink' : 'text-muted',
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-mint" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>

      {/* Контент шага */}
      <div className="p-6 md:p-8">
        {step === 0 && <RoomStep input={input} update={update} />}
        {step === 1 && <MaterialStep input={input} update={update} />}
        {step === 2 && <PriceStep input={input} toggleWork={toggleWork} />}
        {step === 3 && <ResultStep input={input} result={result} />}

        {/* Навигация */}
        <div className="mt-8 flex items-center justify-between border-t border-mint pt-6">
          {step > 0 ? (
            <button
              onClick={prev}
              className="rounded-full border border-mint px-6 py-3 font-semibold text-primary transition hover:bg-mint"
            >
              ← Назад
            </button>
          ) : (
            <button
              onClick={reset}
              className="rounded-full px-6 py-3 font-semibold text-muted transition hover:text-ink"
            >
              Сбросить
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-card transition hover:bg-primary-dark"
            >
              Далее →
            </button>
          ) : (
            <button
              onClick={() => setStep(0)}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-ink shadow-glow transition hover:bg-accent-dark"
            >
              Пересчитать заново
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
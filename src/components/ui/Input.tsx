import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const base =
  'w-full rounded-xl border border-mint bg-light px-4 py-3 text-sm text-ink placeholder:text-muted transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

/** Инпут с подписью и выводом ошибки (совместим с React Hook Form) */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        aria-invalid={!!error}
        className={cn(base, error && 'border-red-400 focus:border-red-400 focus:ring-red-100', className)}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  ),
);
Input.displayName = 'Input';
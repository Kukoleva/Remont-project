import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'white';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 shadow-card',
  accent: 'bg-accent text-ink hover:bg-accent-dark hover:-translate-y-0.5 shadow-glow',
  outline: 'border border-primary/25 text-primary hover:bg-mint',
  ghost: 'text-primary hover:bg-mint',
  white: 'bg-white text-primary hover:bg-mint shadow-card',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[52px] px-8 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: Variant;
  size?: Size;
}

/** Универсальная кнопка: рендерит <button> или <Link> при наличии href */
export function Button({ href, variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
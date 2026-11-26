import { cn } from '@/lib/cn';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** включить hover-поднятие карточки */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/** Скруглённая карточка с мягкой тенью (радиус 18px, shadow-card) */
export function Card({ interactive = false, padding = 'md', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card bg-white shadow-card',
        paddings[padding],
        interactive && 'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

type PlaceholderImageProps = {
  label?: string;
  /** соотношение сторон, напр. '4/3', '16/9' */
  ratio?: string;
  className?: string;
};

/**
 * Заглушка изображения: зелёный градиент + иконка.
 * Используется вместо фото до загрузки реальных media-файлов.
 */
export function PlaceholderImage({ label, ratio = '4/3', className }: PlaceholderImageProps) {
  return (
    <div
      className={cn('img-placeholder-gradient flex items-center justify-center rounded-card', className)}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label ?? 'Изображение'}
    >
      <div className="flex flex-col items-center gap-2 text-primary/60">
        <ImageIcon className="h-8 w-8" />
        {label && <span className="px-4 text-center text-xs font-medium">{label}</span>}
      </div>
    </div>
  );
}
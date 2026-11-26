import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Утилита слияния tailwind-классов (shadcn/ui подход) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
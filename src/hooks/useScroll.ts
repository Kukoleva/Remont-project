'use client';

import { useEffect, useState } from 'react';

/** Хук отслеживания скролла: прогресс + позиция */
export function useScroll() {
  const [y, setY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const top = el.scrollTop || window.scrollY;
      const height = el.scrollHeight - el.clientHeight;
      setY(top);
      setProgress(height > 0 ? Math.min(1, top / height) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { y, progress };
}

/** Плавный скролл к элементу по id */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
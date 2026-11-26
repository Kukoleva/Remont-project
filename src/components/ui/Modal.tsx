'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

/** Модальное окно с анимацией (framer-motion) и доступностью */
export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-card-lg bg-white p-6 shadow-lift"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted transition hover:bg-mint hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
            {title && <h3 className="mb-4 pr-8 text-xl font-bold">{title}</h3>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
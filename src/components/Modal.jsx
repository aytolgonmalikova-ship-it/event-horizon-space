import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../i18n/LanguageContext';

/** Accessible modal: portal, Esc to close, focus trap, scroll lock, backdrop click. */
export default function Modal({ open, onClose, children, labelledBy, wide = false }) {
  const { t } = useLang();
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    panel?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel) {
        const f = panel.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 animate-[fade-up_.3s_ease-out] bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`glass-strong relative max-h-[92vh] w-full min-w-0 animate-fade-up overflow-y-auto rounded-t-3xl shadow-glow outline-none sm:rounded-3xl ${
          wide ? 'max-w-6xl' : 'max-w-4xl'
        }`}
      >
        <div className="sticky top-0 z-20 flex h-0 justify-end overflow-visible">
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="m-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-void/80 text-xl text-white backdrop-blur transition hover:rotate-90 hover:bg-white/10"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

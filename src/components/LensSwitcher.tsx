import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { lenses } from '../lenses/registry';

type Variant = 'reel' | 'volume' | 'line';

/* One position for all three so it never lands on artwork or body text. The
   treatment differs per lens; the placement does not. */
const PLACEMENT = 'top-3 right-3 sm:top-5 sm:right-5';
const MENU_ANCHOR = 'top-full right-0 mt-1';

/**
 * Quiet but obvious way to move between the three complete versions. Styled and
 * positioned differently in each lens so it reads as part of that artefact
 * rather than as a shared theme picker bolted on top.
 */
export function LensSwitcher({ variant = 'reel' }: { variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const wrap = useRef<HTMLDivElement>(null);
  const current = lenses.find((l) => l.path === pathname) ?? lenses[0];

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const paper = variant === 'volume';

  const trigger =
    variant === 'reel'
      ? 'bg-jade-950/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-jade-100/75 backdrop-blur hover:text-amber-300'
      : variant === 'line'
        ? 'border border-jade-100/25 bg-jade-950/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-jade-100/80 backdrop-blur hover:border-cyanEdge/60 hover:text-cyanEdge'
        : 'bg-paper-50 px-3 py-2 font-serif text-[0.72rem] uppercase tracking-[0.26em] text-paper-700 shadow-[0_0_0_1px_hsl(36_18%_78%)] hover:text-paper-900';

  return (
    <div ref={wrap} className={`fixed z-50 ${PLACEMENT}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-baseline gap-2 transition-colors ${trigger}`}
      >
        <span className={paper ? 'text-paper-300' : 'text-jade-100/40'}>
          {variant === 'volume' ? 'Edition' : 'Version'}
        </span>
        <span className="font-medium">{current.name}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
            className={[
              'absolute w-60 backdrop-blur',
              MENU_ANCHOR,
              paper
                ? 'bg-paper-50/97 text-paper-900 ring-1 ring-paper-300'
                : 'bg-jade-950/97 text-jade-100 ring-1 ring-jade-800',
            ].join(' ')}
          >
            {lenses.map((l) => {
              const isCurrent = l.path === pathname;
              return (
                <li key={l.id} role="none">
                  <Link
                    role="menuitem"
                    to={l.path}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={[
                      'flex items-baseline justify-between gap-3 px-3 py-2.5 text-sm transition-colors',
                      paper
                        ? isCurrent
                          ? 'bg-paper-200 font-serif'
                          : 'font-serif hover:bg-paper-100'
                        : isCurrent
                          ? 'bg-jade-800'
                          : 'hover:bg-jade-900',
                    ].join(' ')}
                  >
                    <span className="font-medium">{l.name}</span>
                    <span className={paper ? 'text-xs text-paper-700' : 'text-xs text-jade-100/60'}>
                      {l.blurb}
                    </span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

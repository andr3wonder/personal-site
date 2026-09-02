import { Link, useLocation } from 'react-router-dom';
import { lenses } from '../lenses/registry';

type Variant = 'reel' | 'volume' | 'line';

/**
 * Version switching lives in the document, not in a floating chip. It sits at
 * the foot of every version as real content, so it never lands on artwork and
 * never reads as a build control.
 */
export function EditionFooter({ variant }: { variant: Variant }) {
  const { pathname } = useLocation();
  const paper = variant === 'volume';

  const label = paper ? 'This life, set three ways' : 'This life, told three ways';

  return (
    <nav
      aria-label="Versions of this site"
      className={[
        'border-t',
        paper ? 'border-paper-300 text-paper-900' : 'border-jade-800 text-jade-50',
      ].join(' ')}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-rhythm3 sm:px-8">
        <p
          className={[
            'mb-6 text-[0.7rem] uppercase tracking-[0.28em]',
            paper ? 'font-serif text-paper-700' : 'font-mono text-jade-100/60',
          ].join(' ')}
        >
          {label}
        </p>

        <ul className="grid list-none gap-px overflow-hidden pl-0 sm:grid-cols-3">
          {lenses.map((l) => {
            const isCurrent = l.path === pathname || (pathname === '/' && l.id === 'reel');
            return (
              <li key={l.id}>
                <Link
                  to={l.path}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={[
                    'group flex h-full flex-col justify-between gap-6 p-5 transition-colors sm:p-6',
                    paper
                      ? isCurrent
                        ? 'bg-paper-200'
                        : 'bg-paper-50 hover:bg-paper-200'
                      : isCurrent
                        ? 'bg-jade-800'
                        : 'bg-jade-900/60 hover:bg-jade-800',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'text-[0.68rem] uppercase tracking-[0.24em]',
                      paper ? 'font-serif text-paper-700' : 'font-mono text-jade-100/60',
                    ].join(' ')}
                  >
                    {isCurrent ? 'You are reading' : 'Switch to'}
                  </span>
                  <span>
                    <span
                      className={[
                        'block text-2xl',
                        paper ? 'font-serif' : 'font-display uppercase tracking-tight',
                      ].join(' ')}
                    >
                      {l.name}
                    </span>
                    <span
                      className={[
                        'mt-1 block text-sm',
                        paper ? 'font-serif text-paper-700' : 'text-jade-100/70',
                      ].join(' ')}
                    >
                      {l.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { lenses } from '../lenses/registry';

type Variant = 'reel' | 'atlas' | 'volume' | 'line';

/**
 * Version switching lives in the document, not in a floating chip. It sits at
 * the foot of every version as real content, so it never lands on artwork and
 * never reads as a build control.
 */
export function EditionFooter({ variant }: { variant: Variant }) {
  const { pathname } = useLocation();
  const paper = variant === 'volume';

  if (variant === 'reel') {
    return (
      <nav
        aria-label="Versions of this site"
        className="border-t border-jade-800 bg-jade-950 text-jade-50"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-serif text-[clamp(2.2rem,4vw,4rem)] font-light leading-none tracking-[-0.04em]">
            Other editions
          </p>
          <ul className="mt-10 grid list-none border-t border-jade-800 pl-0 sm:grid-cols-2 lg:grid-cols-4">
            {lenses.map((lens, index) => {
              const isCurrent =
                lens.path === pathname || (pathname === '/' && lens.id === 'reel');
              return (
                <li
                  key={lens.id}
                  className="border-b border-jade-800 sm:border-r sm:last:border-r-0"
                >
                  <Link
                    to={lens.path}
                    aria-current={isCurrent ? 'page' : undefined}
                    className="group block py-6 sm:px-6"
                  >
                    <span className="font-reel text-[9px] font-medium tracking-[0.1em] text-[#7fa5b6]">
                      0{index + 1}
                    </span>
                    <span className="mt-4 flex items-baseline justify-between gap-5">
                      <span className="font-display text-3xl uppercase">{lens.name}</span>
                      <span className="text-sm text-jade-100/55">
                        {isCurrent ? 'Current' : 'Open'}
                      </span>
                    </span>
                    <span className="mt-3 block h-px origin-left scale-x-0 bg-[#7fa5b6] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

  const label = paper ? 'This life, set four ways' : 'This life, told four ways';

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

        <ul className="grid list-none gap-px overflow-hidden pl-0 sm:grid-cols-2 lg:grid-cols-4">
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

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * The 4-1-4 spine, read as a strip of film perforations. Doubles as a scrubber:
 * each perforation is a real link that seeks to that scene. The active state is
 * distinguished by length as well as colour, so it never reads as a scrollbar.
 */
export function SprocketSpine({
  chapters,
  active,
  progress,
}: {
  chapters: readonly { id: string; label: string }[];
  active: string;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const fill = useSpring(progress, { stiffness: 120, damping: 30, mass: 0.4 });
  const height = useTransform(fill, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);

  return (
    <nav
      aria-label="Scenes"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-full w-16 lg:block"
    >
      <div className="flex h-full items-center">
        <div className="relative flex w-16 flex-col gap-3">
          {/* the strip runs exactly the height of the ticks, so the fill always
              lines up with the scene it is reporting */}
          <span aria-hidden className="absolute left-7 top-0 h-full w-px bg-jade-800" />
          {!reduced && (
            <motion.span
              aria-hidden
              style={{ height }}
              className="absolute left-7 top-0 w-px bg-amber-400"
            />
          )}

          {chapters.map((c, i) => {
            const isActive = c.id === active;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="pointer-events-auto group relative flex h-5 w-16 items-center justify-start pl-[1.4rem]"
              >
                <span className="sr-only">
                  Scene {i + 1}, {c.label}
                </span>
                <span
                  aria-hidden
                  className={[
                    'block h-[2px] transition-all duration-300',
                    isActive
                      ? 'w-6 bg-amber-400'
                      : 'w-2.5 bg-jade-600 group-hover:w-4 group-hover:bg-jade-300',
                  ].join(' ')}
                />
                <span
                  aria-hidden
                  className={[
                    'absolute left-14 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest transition-opacity',
                    isActive
                      ? 'text-amber-300 opacity-100'
                      : 'text-jade-100/70 opacity-0 group-hover:opacity-100',
                  ].join(' ')}
                >
                  {c.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/**
 * A scene. Two layouts:
 *  - `overlay`  a full-bleed still behind a single column of copy (cinematic)
 *  - `split`    no still; title occupies one field of the 4-1-4 spine and the
 *               body occupies the other, so the full width is actually used
 */
export function Scene({
  id,
  index,
  slate,
  children,
  title,
  image,
  align = 'left',
  tall = false,
  layout = 'overlay',
  focal = 'center',
}: {
  id: string;
  index: number;
  slate: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  image?: { src: string; alt: string };
  align?: 'left' | 'right';
  tall?: boolean;
  layout?: 'overlay' | 'split';
  focal?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  const slateEl = (
    <p
      id={`${id}-slate`}
      className="mb-6 font-mono text-[10px] uppercase tracking-[0.34em] text-amber-400"
    >
      {slate}
      <span className="sr-only">, scene {index}</span>
    </p>
  );

  const reveal = {
    initial: reduced ? false : { opacity: 0, y: 26 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 } as const,
    transition: { duration: 0.5, ease: [0.16, 0.84, 0.24, 1] as const },
  };

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-slate`}
      className={[
        'relative flex items-center overflow-hidden lg:pl-16',
        layout === 'overlay' ? (tall ? 'min-h-[100vh]' : 'min-h-[88vh]') : '',
      ].join(' ')}
    >
      {image && (
        <div aria-hidden className="absolute inset-0">
          <motion.img
            src={image.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={reduced ? { objectPosition: focal } : { y, scale, objectPosition: focal }}
            className="h-full w-full object-cover"
          />
          <div
            className={[
              'absolute inset-0',
              align === 'left'
                ? 'bg-gradient-to-r from-jade-950 via-jade-950/85 to-jade-950/20'
                : 'bg-gradient-to-l from-jade-950 via-jade-950/85 to-jade-950/20',
            ].join(' ')}
          />
          {/* keep copy legible on small screens where the gradient runs out */}
          <div className="absolute inset-0 bg-jade-950/45 sm:bg-transparent" />
        </div>
      )}

      {layout === 'split' ? (
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-rhythm4 sm:px-8">
          <motion.div {...reveal} className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              {slateEl}
              {title}
            </div>
            <div className="min-w-0">{children}</div>
          </motion.div>
        </div>
      ) : (
        <div
          className={[
            'relative z-10 mx-auto flex w-full max-w-6xl px-5 py-24 sm:px-8',
            align === 'right' ? 'justify-end' : 'justify-start',
          ].join(' ')}
        >
          <motion.div {...reveal} className="w-full max-w-2xl">
            {slateEl}
            {title}
            {children}
          </motion.div>
        </div>
      )}
    </section>
  );
}

/** Section heading in the Reel voice: condensed, uppercase, tight. */
export function SceneTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(2.4rem,6vw,4rem)] uppercase leading-[0.9] tracking-tight text-jade-50">
      {children}
    </h2>
  );
}

export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 max-w-measure text-lg leading-relaxed text-jade-100/85">{children}</p>;
}

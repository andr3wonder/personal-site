import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/*
 * Reel is built from three scene types, not one configurable module, and its
 * page geometry is centred and frame-locked, which is what separates it from
 * Volume (a left single measure with a live outer margin) and Line (a
 * full-width board hung off a rail).
 *
 *   Frame  full-bleed photograph, copy centred on a solid film lower-third
 *   Card   type only on black at display scale; this is the cut between frames
 *   Plate  full-bleed cut to white carrying product UI at full width
 *
 * Wayfinding is a film-leader frame counter set into the corner of the frame.
 * There is deliberately no "NN — CATEGORY" eyebrow anywhere.
 */

const EASE = [0.16, 0.84, 0.24, 1] as const;

/** Subtitle under a title. Carries the category without an eyebrow rule. */
export function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-7 max-w-2xl text-center text-[clamp(1.05rem,1.9vw,1.4rem)] leading-snug text-jade-100/70">
      {children}
    </p>
  );
}

/**
 * A held frame: one photograph filling the screen, copy centred on a solid
 * lower-third so it is legible over any picture.
 */
export function Frame({
  id,
  image,
  focal = '50% 50%',
  title,
  children,
  grade = false,
}: {
  id: string;
  image: { src: string; alt: string };
  focal?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  grade?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative flex h-[100svh] flex-col justify-end overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        <motion.img
          src={image.src}
          alt=""
          loading="lazy"
          decoding="async"
          style={reduced ? { objectPosition: focal } : { y, objectPosition: focal }}
          className={[
            'h-[110%] w-full object-cover',
            grade ? 'saturate-[0.6] contrast-[1.06] sepia-[0.14]' : '',
          ].join(' ')}
        />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-jade-950 to-transparent" />
      </div>


      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-10 w-full border-t border-jade-50/15 bg-jade-950/95 backdrop-blur-[6px]"
      >
        <div className="mx-auto w-full max-w-4xl px-5 py-9 sm:px-8 sm:py-11">
          <h2
            id={`${id}-title`}
            className="text-center font-display text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-[0.86] tracking-[-0.025em] text-jade-50"
          >
            {title}
          </h2>
          {children && <div className="mx-auto mt-7 max-w-2xl text-left">{children}</div>}
        </div>
      </motion.div>

      {/* the photograph is content, so it keeps a described copy for assistive tech */}
      <img src={image.src} alt={image.alt} className="sr-only" />
    </section>
  );
}

/**
 * A title card. Type only, on black, centred, at display scale. This is the cut
 * between photographs, and where the dense material gets room to be read.
 */
export function Card({
  id,
  title,
  sub,
  children,
}: {
  id: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-jade-950"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto w-full max-w-5xl px-5 py-rhythm3 sm:px-8"
      >
        <h2
          id={`${id}-title`}
          className="text-center font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.03em] text-jade-50"
        >
          {title}
        </h2>
        {sub && <Sub>{sub}</Sub>}
        {children && <div className="mt-16 text-left">{children}</div>}
      </motion.div>
    </section>
  );
}

/** A cut to white. Product UI at full width on its own ground. */
export function Plate({
  images,
  caption,
}: {
  images: { src: string; alt: string }[];
  caption: string;
}) {
  const reduced = useReducedMotion();
  return (
    <section aria-label={caption} className="bg-[#f4f3f0] py-rhythm3">
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <div className={images.length > 1 ? 'grid gap-5 sm:grid-cols-2' : ''}>
          {images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full object-contain"
            />
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-jade-950/55">
          {caption}
        </p>
      </motion.div>
    </section>
  );
}

/**
 * A credits roll: a single centred column of role and name pairs joined by dot
 * leaders, set small and tight, the way an end crawl actually sets.
 */
export function Roll({ role, children }: { role: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-x-4 gap-y-0.5 py-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.5fr)]">
      <dt className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.08em] text-jade-100/45 sm:text-right">
        {role}
      </dt>
      <span aria-hidden className="hidden select-none text-jade-100/20 sm:block">
        ·····
      </span>
      <dd className="m-0 text-[0.95rem] leading-[1.6] text-jade-50">{children}</dd>
    </div>
  );
}

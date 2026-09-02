import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LensSwitcher } from '../../components/LensSwitcher';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLensTheme } from '../../hooks/useLensTheme';
import { Lede, Scene, SceneTitle, SprocketSpine } from './parts';
import {
  aboutFacts,
  channels,
  closing,
  communities,
  contentStat,
  guideNotes,
  guides,
  hobbies,
  identity,
  infoDietHref,
  mission,
  notebooks,
  notionHome,
  photos,
  priorities,
  products,
  reads,
  readsIntro,
  work,
} from '../../data/content';

/**
 * Eight scenes. Deliberately fewer and larger than the other two lenses: a cut
 * holds longer than a chapter does. The reading list, hobbies and channels are
 * collected into a single end-credits roll rather than given scenes of their own.
 */
const scenes = [
  { id: 'open', label: 'Opening' },
  { id: 'priorities', label: 'Priorities' },
  { id: 'about', label: 'About' },
  { id: 'blaze', label: 'Blaze' },
  { id: 'feelable', label: 'feelable' },
  { id: 'genz', label: 'GenZ Taiwan' },
  { id: 'credits', label: 'Credits' },
  { id: 'close', label: 'Contact' },
];

const sceneIds = scenes.map((s) => s.id);

const Out = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="rule-link text-jade-50 hover:text-amber-300">
    {children}
  </a>
);

/** Splits a stat like "200k Users" into a numeral and a small unit label. */
function BigStat({ value }: { value: string }) {
  const [figure, ...rest] = value.split(' ');
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.85] text-jade-50">
      <span>{figure}</span>
      {rest.length > 0 && (
        <span className="font-mono text-[0.4em] font-medium uppercase leading-none tracking-[0.24em] text-amber-400">
          {rest.join(' ')}
        </span>
      )}
    </p>
  );
}

function Strip({ images }: { images: { src: string; alt: string }[] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  return (
    <div ref={ref} className="mt-12 -mr-5 overflow-hidden sm:-mr-8">
      <motion.ul style={reduced ? undefined : { x }} className="flex list-none gap-4 pl-0">
        {images.map((img) => (
          <li key={img.src} className="w-[74vw] shrink-0 sm:w-[24rem]">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full border border-jade-800 object-cover object-top"
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/** A credits row: role on the left, names on the right, as on a title card. */
function Credit({ role, children }: { role: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 py-3 sm:grid-cols-[11rem_1fr]">
      <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-400/85 sm:text-right">
        {role}
      </dt>
      <dd className="m-0 text-[0.95rem] leading-[1.7] text-jade-100/85">{children}</dd>
    </div>
  );
}

export function ReelLens() {
  useLensTheme('hsl(160 34% 6%)', 'dark');
  const reduced = useReducedMotion();
  const active = useActiveSection(sceneIds);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroP, [0, 1], ['0%', '18%']);

  const blaze = products[0];
  const feelable = products[1];
  const genz = communities.find((c) => c.id === 'genz')!;
  const clubs = communities.filter((c) => c.id !== 'genz');
  const travel = hobbies.find((h) => h.id === 'travel')!;

  return (
    <div className="grain relative bg-jade-950">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LensSwitcher variant="reel" />
      <SprocketSpine chapters={scenes} active={active} progress={scrollYProgress} />

      <main id="main">
        {/* ------------------------------------------------------------- 01 */}
        <section
          id="open"
          ref={heroRef}
          aria-labelledby="hero-name"
          className="relative flex min-h-[100svh] items-end overflow-hidden lg:pl-16"
        >
          <motion.div aria-hidden className="absolute inset-0" style={reduced ? undefined : { y: heroY }}>
            <img
              src={photos.hero.src}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-[118%] w-full object-cover object-[74%_50%] sm:object-[62%_50%] lg:object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-jade-950 via-jade-950/75 to-transparent" />
            <div className="absolute inset-0 bg-jade-950/25" />
          </motion.div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-amber-400"
            >
              Taipei · Berkeley · San Francisco
            </motion.p>

            <motion.h1
              id="hero-name"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 0.84, 0.24, 1] }}
              className="font-display text-[clamp(3.2rem,12vw,8.5rem)] uppercase leading-[0.82] tracking-tight text-jade-50"
            >
              Andrew Chuang
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-2 font-sans text-[clamp(2rem,6vw,4.2rem)] font-extralight leading-none tracking-[0.22em] text-jade-50"
            >
              {identity.nameZh}
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.55 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-jade-50/85 sm:text-xl"
            >
              {mission.headline}
            </motion.p>
          </div>
        </section>

        {/* ------------------------------------------------------------- 02 */}
        <Scene
          id="priorities"
          index={2}
          slate="What matters"
          layout="split"
          title={
            <>
              <SceneTitle>My life priorities</SceneTitle>
              <Lede>
                Five, in order.{' '}
                <Out href={priorities.articleHref}>Written on a train to Strasbourg</Out>.
              </Lede>
              <figure className="mt-10 hidden lg:block">
                <img
                  src={photos.tunnel.src}
                  alt={photos.tunnel.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full border border-jade-800 object-cover object-[52%_30%]"
                />
              </figure>
            </>
          }
        >
          <ol className="list-none space-y-0 pl-0">
            {priorities.items.map((p, i) => (
              <li key={p.label} className="flex gap-5 border-t border-jade-800 py-5 last:border-b">
                <span className="mt-1.5 font-mono text-[11px] tabular-nums text-amber-400/85">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-lg">
                  <span className="text-jade-50">{p.label}</span>{' '}
                  <span className="text-jade-100/70">{p.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </Scene>

        {/* ------------------------------------------------------------- 03 */}
        <Scene
          id="about"
          index={3}
          slate="About"
          image={photos.portrait}
          align="left"
          focal="85% 40%"
        >
          <SceneTitle>The dance of tech, art &amp; people</SceneTitle>
          <Lede>{identity.taglineTail}</Lede>
          <ul className="mt-9 list-none space-y-0 pl-0">
            {aboutFacts.map((f) => (
              <li key={f.text} className="border-t border-jade-100/25 py-3 text-jade-100/85 last:border-b">
                {f.text}
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {notebooks.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                className="rule-link font-mono text-[11px] uppercase tracking-[0.2em] text-jade-100/75 hover:text-amber-300"
              >
                {n.label}
              </a>
            ))}
          </p>
        </Scene>

        {/* ------------------------------------------------------------- 04 */}
        <Scene
          id="blaze"
          index={4}
          slate="Product"
          tall
          layout="split"
          title={
            <>
              <SceneTitle>
                <Out href={blaze.href!}>Blaze Messenger</Out>
              </SceneTitle>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-jade-100/60">
                {blaze.kicker}
              </p>
              <figure className="mt-10 hidden lg:block">
                <img
                  src={blaze.images[0].src}
                  alt={blaze.images[0].alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full border border-jade-800 object-cover"
                />
              </figure>
            </>
          }
        >
          <BigStat value={blaze.headline!} />
          <ul className="mt-10 list-none space-y-0 pl-0">
            {blaze.bullets.map((b) => (
              <li key={b} className="border-t border-jade-800 py-4 text-jade-100/85 last:border-b">
                {b}
              </li>
            ))}
          </ul>
          <figure className="mt-10 lg:hidden">
            <img
              src={blaze.images[0].src}
              alt={blaze.images[0].alt}
              loading="lazy"
              decoding="async"
              className="w-full border border-jade-800 object-cover"
            />
          </figure>
        </Scene>

        {/* ------------------------------------------------------------- 05 */}
        <Scene
          id="feelable"
          index={5}
          slate="Product"
          tall
          layout="split"
          title={
            <>
              <SceneTitle>
                <Out href={feelable.href!}>feelable.ai</Out>
              </SceneTitle>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-jade-100/60">
                {feelable.kicker}
              </p>
            </>
          }
        >
          <Lede>
            A journal partner that remembers and grows with you. Alongside it, a Vibecode Playground —
            the shelf where the half-built things sit.
          </Lede>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.28em] text-amber-400/85">
            Before that
          </p>
          <ul className="mt-3 list-none space-y-0 pl-0">
            {work.map((w) => (
              <li
                key={w.name}
                className="grid gap-1 border-t border-jade-800 py-4 last:border-b sm:grid-cols-[1fr_auto] sm:items-baseline"
              >
                <span>
                  <Out href={w.href}>{w.name}</Out>
                  <span className="ml-2 text-jade-100/55">{w.note}</span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-jade-100/60">
                  {w.role}
                </span>
              </li>
            ))}
          </ul>

          <Strip images={feelable.images} />
        </Scene>

        {/* ------------------------------------------------------------- 06 */}
        <Scene
          id="genz"
          index={6}
          slate="Communities"
          tall
          layout="split"
          title={
            <>
              <SceneTitle>GenZ Taiwan</SceneTitle>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-jade-100/60">
                Founder
              </p>
              <figure className="mt-9 hidden lg:block">
                <img
                  src={genz.images![0].src}
                  alt={genz.images![0].alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full border border-jade-800 object-cover"
                />
              </figure>
            </>
          }
        >
          <Lede>
            Before the products, this — getting students across Taiwan into the same room.
          </Lede>
          <ul className="mt-9 list-none space-y-0 pl-0">
            {genz.bullets!.map((b) => (
              <li key={b.text} className="border-t border-jade-800 py-4 text-jade-100/85 last:border-b">
                {b.href ? <Out href={b.href}>{b.text}</Out> : b.text}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {genz.links!.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rule-link font-mono text-[11px] uppercase tracking-[0.2em] text-jade-100/75 hover:text-amber-300"
              >
                {l.label}
              </a>
            ))}
          </p>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.28em] text-amber-400/85">
            And three more rooms
          </p>
          <ul className="mt-3 list-none space-y-0 pl-0">
            {clubs.map((c) => (
              <li
                key={c.id}
                className="grid gap-1 border-t border-jade-800 py-4 last:border-b sm:grid-cols-[1fr_auto] sm:items-baseline"
              >
                <span className="text-jade-50">
                  {c.href ? <Out href={c.href}>{c.name}</Out> : c.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-jade-100/60">
                  {c.role}
                </span>
              </li>
            ))}
          </ul>
          <Strip images={[genz.images![1], genz.images![2], genz.images![3]]} />
        </Scene>

        {/* ------------------------------------------------- 07  end credits */}
        <section
          id="credits"
          aria-labelledby="credits-title"
          className="relative overflow-hidden lg:pl-16"
        >
          <div className="mx-auto w-full max-w-4xl px-5 py-rhythm4 sm:px-8">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.16, 0.84, 0.24, 1] }}
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.34em] text-amber-400">
                End credits
              </p>
              <p className="mb-9 max-w-measure text-jade-100/60">
                “Have the courage to become a novice again and again and be in a constant state of
                growing, changing, and reinventing yourself.”
              </p>

              <h2
                id="credits-title"
                className="font-display text-[clamp(2.4rem,6vw,4rem)] uppercase leading-[0.9] text-jade-50"
              >
                Everything else
              </h2>
              <p className="mt-5 max-w-measure text-jade-100/70">{readsIntro}</p>

              <dl className="mt-14 divide-y divide-jade-800">
                {reads.map((r) => (
                  <Credit key={r.label} role={r.label}>
                    {r.items.join(' · ')}
                  </Credit>
                ))}
                <Credit role="Full list">
                  <Out href={infoDietHref}>The Info Diet, in Notion</Out>
                </Credit>
              </dl>

              <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.28em] text-amber-400/85">
                Off the clock
              </p>
              <dl className="mt-3 divide-y divide-jade-800">
                {hobbies.map((h) => (
                  <Credit key={h.id} role={h.label}>
                    {h.stat && <span className="text-jade-50">{h.stat}</span>}
                    {h.stat && (h.note || h.links) && <span className="text-jade-100/30"> · </span>}
                    {h.note && <span>{h.note}</span>}
                    {h.links?.map((l) => (
                      <span key={l.href}>
                        <span className="text-jade-100/30"> · </span>
                        <Out href={l.href}>{l.label}</Out>
                      </span>
                    ))}
                    {h.bullets && (
                      <span className="mt-1.5 block text-jade-100/70">
                        {h.bullets.map((b, i) => (
                          <span key={b.text}>
                            {i > 0 && <span className="text-jade-100/30"> · </span>}
                            {b.href ? <Out href={b.href}>{b.text}</Out> : b.text}
                          </span>
                        ))}
                      </span>
                    )}
                  </Credit>
                ))}
              </dl>

              <div className="mt-16 grid gap-x-8 gap-y-1 sm:grid-cols-[11rem_1fr]">
                <p className="m-0 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-400/85 sm:text-right">
                  Published
                </p>
                <div>
                  <BigStat value={contentStat} />
                </div>
              </div>

              <dl className="mt-6 divide-y divide-jade-800">
                {guides.map((g) => (
                  <Credit key={g.href} role="Guide">
                    <Out href={g.href}>{g.label}</Out>
                    {guideNotes[g.label] && (
                      <span className="ml-2 text-jade-100/55">{guideNotes[g.label]}</span>
                    )}
                  </Credit>
                ))}
                {channels.map((c) => (
                  <Credit key={c.href} role={c.label}>
                    <Out href={c.href}>{c.handle}</Out>
                    {c.meta && <span className="ml-2 text-jade-100/45">{c.meta}</span>}
                  </Credit>
                ))}
              </dl>

              <figure className="mt-16 m-0">
                <img
                  src={travel.image!.src}
                  alt={travel.image!.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full border border-jade-800 object-cover object-top"
                />
              </figure>
            </motion.div>
          </div>
        </section>

        {/* ------------------------------------------------------------- 08 */}
        <section
          id="close"
          aria-labelledby="close-title"
          className="relative flex min-h-[92vh] items-center overflow-hidden lg:pl-16"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
            <blockquote className="m-0 max-w-3xl">
              <p className="m-0 font-display text-[clamp(1.9rem,5.2vw,3.4rem)] uppercase leading-[1.02] text-jade-50">
                Don’t follow your dreams, follow your curiosity!
              </p>
              <footer className="mt-4 text-sm text-jade-100/60">
                <Out href="https://substack.com/home/post/p-148637074">And find your style</Out>
              </footer>
            </blockquote>


            <h2 id="close-title" className="mt-16 font-display text-4xl uppercase text-jade-50">
              {closing.title}
            </h2>
            <p className="mt-3 max-w-xl text-jade-100/75">{closing.body}</p>
            <p className="mt-6 flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-[0.24em]">
              {closing.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rule-link text-amber-300 hover:text-amber-200"
                >
                  {l.label}
                </a>
              ))}
            </p>

            <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.3em] text-jade-100/70">
              <a href={notionHome} target="_blank" rel="noreferrer" className="rule-link">
                Also on Notion
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

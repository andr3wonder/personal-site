import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { LensSwitcher } from '../../components/LensSwitcher';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLensTheme } from '../../hooks/useLensTheme';
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

const Out = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-paper-900 underline decoration-paper-300 decoration-1 underline-offset-[5px] transition-colors hover:decoration-paper-900"
  >
    {children}
  </a>
);

/** Ten chapters. Eyebrow, contents and folio are all generated from this list,
 *  so the numbering can never disagree with itself. */
const toc = [
  { id: 'priorities', n: 1, title: 'My Life Priorities', page: 9 },
  { id: 'about', n: 2, title: 'The Dance of Tech, Art & People', page: 17 },
  { id: 'blaze', n: 3, title: 'Blaze Messenger', page: 24 },
  { id: 'feelable', n: 4, title: 'feelable.ai', page: 38 },
  { id: 'work', n: 5, title: 'Two Internships', page: 46 },
  { id: 'genz', n: 6, title: 'GenZ Taiwan', page: 51 },
  { id: 'clubs', n: 7, title: 'Rooms I Helped Build', page: 68 },
  { id: 'reads', n: 8, title: 'Info Diet', page: 74 },
  { id: 'hobbies', n: 9, title: 'Curiosity, Unpaid', page: 92 },
  { id: 'content', n: 10, title: 'Published', page: 108 },
];

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

function RunningHead({ left, right }: { left: string; right: string }) {
  return (
    <div className="mb-rhythm3 flex items-baseline justify-between gap-6 border-b border-paper-300 pb-2 font-serif text-[0.68rem] uppercase tracking-[0.24em] text-paper-700">
      <span>{left}</span>
      <span className="text-right">{right}</span>
    </div>
  );
}

function Folio({ page }: { page: number }) {
  return (
    <p className="mt-rhythm3 text-center font-serif text-[0.78rem] tabular-nums text-paper-700">
      {page}
    </p>
  );
}

function Plate({
  src,
  alt,
  caption,
  ratio = 'aspect-[4/5]',
}: {
  src: string;
  alt: string;
  caption: string;
  ratio?: string;
}) {
  return (
    <figure className="m-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${ratio} w-full object-cover object-top ring-1 ring-paper-900/15`}
      />
      <figcaption className="mt-2.5 font-serif text-[0.76rem] italic leading-snug text-paper-700">
        {caption}
      </figcaption>
    </figure>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="m-0 border-l border-paper-900/25 pl-5">
      <p className="m-0 font-serif text-[1.06rem] italic leading-[1.55] text-paper-700">
        {children}
      </p>
    </blockquote>
  );
}

/**
 * A chapter set as a spread. The verso column always carries apparatus (the
 * running title, and either a plate or a pull quote) so neither column is ever
 * left as a void.
 */
function Chapter({
  id,
  n,
  title,
  page,
  children,
  verso,
}: {
  id: string;
  n: number;
  title: string;
  page: number;
  children: React.ReactNode;
  verso: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto w-full max-w-5xl px-6 py-rhythm3 sm:px-10 sm:py-rhythm4"
    >
      <RunningHead left={`Chapter ${ROMAN[n]}`} right={title} />

      <motion.div
        initial={reduced ? false : { opacity: 0, rotateY: -6 }}
        animate={inView && !reduced ? { opacity: 1, rotateY: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 0.8, 0.28, 1] }}
        style={{ transformOrigin: 'left center', perspective: 1600 }}
        className="grid gap-x-12 gap-y-10 md:grid-cols-2"
      >
        <div className="md:border-r md:border-paper-300 md:pr-12">
          <h2
            id={`${id}-title`}
            className="font-serif text-[clamp(1.85rem,3.3vw,2.6rem)] font-normal leading-[1.08] tracking-[-0.014em] text-paper-900"
          >
            {title}
          </h2>
          <div className="mt-8">{verso}</div>
        </div>

        <div className="min-w-0 font-serif">{children}</div>
      </motion.div>

      <Folio page={page} />
    </section>
  );
}

const Rows = ({ children }: { children: React.ReactNode }) => (
  <ul className="mt-6 list-none space-y-5 pl-0">{children}</ul>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="m-0 text-[0.7rem] uppercase tracking-[0.24em] text-paper-700">{children}</p>
);

export function VolumeLens() {
  useLensTheme('hsl(40 30% 94%)', 'light');
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  const blaze = products[0];
  const feelable = products[1];
  const genz = communities.find((c) => c.id === 'genz')!;
  const clubs = communities.filter((c) => c.id !== 'genz');
  const travel = hobbies.find((h) => h.id === 'travel')!;
  const cooking = hobbies.find((h) => h.id === 'cooking')!;

  return (
    <div className="tooth min-h-screen bg-paper-100 text-paper-900">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LensSwitcher variant="volume" />

      {!reduced && (
        <div
          aria-hidden
          style={{ transform: `scaleX(${progress})` }}
          className="fixed left-0 top-0 z-40 h-px w-full origin-left bg-paper-900/30"
        />
      )}

      <main id="main">
        {/* ------------------------------------------------------- title page */}
        <section
          aria-labelledby="hero-name"
          className="mx-auto flex min-h-[94svh] w-full max-w-5xl flex-col justify-center px-6 py-rhythm4 sm:px-10"
        >
          <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 md:items-center">
            <div>
              <Label>{identity.bornIn}</Label>
              <h1
                id="hero-name"
                className="mt-7 font-serif text-[clamp(2.2rem,5.4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.022em] text-paper-900"
              >
                Andrew Chuang
              </h1>
              <p className="mt-3 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[0.1em] text-paper-900">
                {identity.nameZh}
              </p>

              <span aria-hidden className="mt-9 block h-px w-20 bg-paper-900/35" />

              <p className="mt-9 max-w-measure font-serif text-body text-paper-900">
                My mission is to foster joy for humanity. I’m a creator at heart, I started by
                building communities in TW, connecting students to do{' '}
                <Out href={mission.inlineLinks.passionProjects}>passion projects</Out>.
              </p>
              <p className="mt-4 max-w-measure font-serif text-body text-paper-900">
                At UC Berkeley, I found my passion in building products:{' '}
                <Out href={mission.inlineLinks.aiVoiceMessenger}>AI Voice Messenger</Out>. Now, I’m
                part of the 1st cohort of Product Builders at LinkedIn.
              </p>
              <p className="mt-4 max-w-measure font-serif text-body italic text-paper-700">
                Join me in bringing joy to the world.
              </p>
            </div>

            <Plate
              src={photos.hero.src}
              alt={photos.hero.alt}
              caption="Frontispiece. Open water, before the day started."
            />
          </div>
        </section>

        {/* --------------------------------------------------------- contents */}
        <section
          aria-labelledby="toc-title"
          className="mx-auto w-full max-w-5xl px-6 py-rhythm4 sm:px-10"
        >
          <RunningHead left="Contents" right={`Andrew Chuang ${identity.nameZh}`} />
          <h2
            id="toc-title"
            className="font-serif text-[clamp(1.7rem,3vw,2.2rem)] font-normal tracking-[-0.014em] text-paper-900"
          >
            Contents
          </h2>
          <p className="mt-6 max-w-measure font-serif text-[1.02rem] italic leading-[1.6] text-paper-700">
            “Have the courage to become a novice again and again and be in a constant state of
            growing, changing, and reinventing yourself.”
          </p>
          <ol className="mt-10 list-none space-y-0 pl-0">
            {toc.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group grid grid-cols-[2.4rem_1fr_auto] items-baseline gap-4 border-b border-paper-300 py-3 font-serif"
                >
                  <span className="text-[0.76rem] tabular-nums text-paper-700">{ROMAN[c.n]}</span>
                  <span className="text-[1.04rem] text-paper-900 underline decoration-transparent underline-offset-[3px] transition-colors group-hover:decoration-paper-300">
                    {c.title}
                  </span>
                  <span className="text-[0.8rem] tabular-nums text-paper-700">{c.page}</span>
                </a>
              </li>
            ))}
          </ol>
          <Folio page={5} />
        </section>

        {/* --------------------------------------------------------------- I */}
        <Chapter
          {...toc[0]}
          verso={
            <Pull>
              Written on a train to Strasbourg. The order is the argument.{' '}
              <Out href={priorities.articleHref}>read the essay</Out>.
            </Pull>
          }
        >
          <ol className="list-none space-y-5 pl-0">
            {priorities.items.map((p, i) => (
              <li key={p.label} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="pt-1 text-[0.76rem] tabular-nums text-paper-700">{i + 1}</span>
                <span className="text-[1.05rem] leading-[1.62]">
                  <span className="text-paper-900">{p.label}.</span>{' '}
                  <span className="text-paper-700">{p.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </Chapter>

        {/* -------------------------------------------------------------- II */}
        <Chapter
          {...toc[1]}
          verso={
            <Plate
              src={photos.portrait.src}
              alt={photos.portrait.alt}
              caption="Plate I. At the rim, Grand Canyon."
            />
          }
        >
          <p className="m-0 text-body text-paper-900">
            {identity.tagline} {identity.taglineTail}
          </p>
          <Rows>
            {aboutFacts.map((f) => (
              <li key={f.text} className="text-[1.04rem] leading-[1.6] text-paper-700">
                {f.text}
              </li>
            ))}
          </Rows>
          <div className="mt-9">
            <Label>Also kept</Label>
            <ul className="mt-2.5 list-none space-y-1.5 pl-0">
              {notebooks.map((n) => (
                <li key={n.href} className="text-[1.02rem]">
                  <Out href={n.href}>{n.label}</Out>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ------------------------------------------------------------- III */}
        <Chapter
          {...toc[2]}
          verso={
            <Plate
              src={blaze.images[0].src}
              alt={blaze.images[0].alt}
              ratio="aspect-[4/3]"
              caption="Plate II. Blaze on the wrist."
            />
          }
        >
          <Label>
            {blaze.kicker} · {blaze.headline}
          </Label>
          <ol className="mt-6 list-none space-y-5 pl-0">
            {blaze.bullets.map((b, i) => (
              <li key={b} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="pt-1 text-[0.8rem] tabular-nums text-paper-700">{i + 1}</span>
                <span className="text-[1.05rem] leading-[1.62] text-paper-900">{b}</span>
              </li>
            ))}
          </ol>
          <p className="mt-7 text-[1.02rem]">
            <Out href={blaze.href!}>The full case notes</Out>
          </p>
        </Chapter>

        {/* -------------------------------------------------------------- IV */}
        <Chapter
          {...toc[3]}
          verso={
            <Plate
              src={feelable.images[1].src}
              alt={feelable.images[1].alt}
              ratio="aspect-[4/3]"
              caption="Plate III. The mood picker, energy against pleasantness."
            />
          }
        >
          <p className="m-0 text-body text-paper-900">
            A mood journaling companion. A journal partner that remembers and grows with you.
          </p>
          <p className="mt-5 text-body text-paper-700">
            Alongside it, a Vibecode Playground, the shelf where the unfinished things sit.
          </p>
          <p className="mt-7 text-[1.02rem]">
            <Out href={feelable.href!}>Open feelable.ai</Out>
          </p>
        </Chapter>

        {/* --------------------------------------------------------------- V */}
        <Chapter
          {...toc[4]}
          verso={
            <Plate
              src={feelable.images[2].src}
              alt={feelable.images[2].alt}
              ratio="aspect-[4/3]"
              caption="Plate IV. feelable.ai, the mood dashboard."
            />
          }
        >
          <ul className="list-none space-y-6 pl-0">
            {work.map((w) => (
              <li key={w.name}>
                <p className="m-0 text-[1.05rem] text-paper-900">
                  <Out href={w.href}>{w.name}</Out>
                </p>
                <p className="m-0 mt-1 text-[0.98rem] text-paper-700">{w.note}</p>
                <p className="m-0 mt-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-paper-700">
                  {w.role}
                </p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* -------------------------------------------------------------- VI */}
        <Chapter
          {...toc[5]}
          verso={
            <div className="space-y-9">
              <Plate
                src={genz.images![0].src}
                alt={genz.images![0].alt}
                ratio="aspect-[4/3]"
                caption="Plate V. Everyone who turned up."
              />
              <Plate
                src={genz.images![1].src}
                alt={genz.images![1].alt}
                ratio="aspect-[4/3]"
                caption="Plate VI. The stage, before doors."
              />
            </div>
          }
        >
          <p className="m-0 text-body text-paper-900">
            Founder. Before the products, this: getting students across Taiwan into the same room.
          </p>
          <Rows>
            {genz.bullets!.map((b) => (
              <li key={b.text} className="text-[1.05rem] leading-[1.62] text-paper-900">
                {b.href ? <Out href={b.href}>{b.text}</Out> : b.text}
              </li>
            ))}
          </Rows>
          <div className="mt-9">
            <Label>Further reading</Label>
            <ul className="mt-2.5 list-none space-y-1.5 pl-0">
              {genz.links!.map((l) => (
                <li key={l.href} className="text-[1.02rem]">
                  <Out href={l.href}>{l.label}</Out>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ------------------------------------------------------------- VII */}
        <Chapter
          {...toc[6]}
          verso={
            <Plate
              src={genz.images![3].src}
              alt={genz.images![3].alt}
              ratio="aspect-[4/3]"
              caption="Plate VII. Mid-session, microphone in hand."
            />
          }
        >
          <ul className="list-none space-y-6 pl-0">
            {clubs.map((c) => (
              <li key={c.id}>
                <p className="m-0 text-[1.05rem] text-paper-900">
                  {c.href ? <Out href={c.href}>{c.name}</Out> : c.name}
                </p>
                <p className="m-0 mt-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-paper-700">
                  {c.role}
                </p>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* ------------------------------------------------------------ VIII */}
        <Chapter
          {...toc[7]}
          verso={
            <>
              <Pull>{readsIntro}</Pull>
              <p className="mt-7 font-serif text-[1.02rem]">
                <Out href={infoDietHref}>The living Info Diet, in Notion</Out>
              </p>
            </>
          }
        >
          <dl className="space-y-6">
            {reads.map((r) => (
              <div key={r.label}>
                <dt className="text-[0.7rem] uppercase tracking-[0.24em] text-paper-700">
                  {r.label}
                </dt>
                <dd className="m-0 mt-1.5 text-[1.02rem] leading-[1.6] text-paper-900">
                  {r.items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </Chapter>

        {/* -------------------------------------------------------------- IX */}
        <Chapter
          {...toc[8]}
          verso={
            <div className="space-y-9">
              <Plate
                src={travel.image!.src}
                alt={travel.image!.alt}
                caption="Plate VIII. The start line, San Francisco."
              />
              <Plate
                src={cooking.image!.src}
                alt={cooking.image!.alt}
                ratio="aspect-[4/3]"
                caption="Plate IX. Meal prep, allegedly."
              />
            </div>
          }
        >
          <ul className="list-none space-y-6 pl-0">
            {hobbies.map((h) => (
              <li key={h.id}>
                <p className="m-0 text-[1.05rem] text-paper-900">
                  {h.label}
                  {h.stat && <span className="text-paper-700">, {h.stat}</span>}
                </p>
                {h.note && (
                  <p className="m-0 mt-1 text-[0.98rem] leading-[1.55] text-paper-700">{h.note}</p>
                )}
                {h.bullets && (
                  <ul className="m-0 mt-2 list-none space-y-1 pl-0 text-[0.98rem] text-paper-700">
                    {h.bullets.map((b) => (
                      <li key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</li>
                    ))}
                  </ul>
                )}
                {h.links && (
                  <p className="m-0 mt-1.5 text-[0.94rem]">
                    {h.links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && <span className="text-paper-300"> · </span>}
                        <Out href={l.href}>{l.label}</Out>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Chapter>

        {/* --------------------------------------------------------------- X */}
        <Chapter
          {...toc[9]}
          verso={
            <Plate
              src={hobbies[0].image!.src}
              alt={hobbies[0].image!.alt}
              ratio="aspect-[4/3]"
              caption="Plate X. The essays, as they sit on Medium."
            />
          }
        >
          <Label>{contentStat}</Label>
          <ul className="mt-6 list-none space-y-5 pl-0">
            {guides.map((g) => (
              <li key={g.href}>
                <p className="m-0 text-[1.05rem]">
                  <Out href={g.href}>{g.label}</Out>
                </p>
                {guideNotes[g.label] && (
                  <p className="m-0 mt-1 text-[0.96rem] text-paper-700">{guideNotes[g.label]}</p>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Label>Elsewhere</Label>
            <ul className="mt-3 grid list-none grid-cols-2 gap-x-8 gap-y-3 pl-0">
              {channels.map((c) => (
                <li key={c.href}>
                  <p className="m-0 text-[1rem]">
                    <Out href={c.href}>{c.label}</Out>
                  </p>
                  <p className="m-0 text-[0.86rem] text-paper-700">{c.handle}</p>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* --------------------------------------------------------- colophon */}
        <section
          id="close"
          aria-labelledby="close-title"
          className="mx-auto w-full max-w-5xl px-6 py-rhythm4 sm:px-10"
        >
          <RunningHead left="Colophon" right={`Andrew Chuang ${identity.nameZh}`} />

          <div className="mx-auto max-w-reading text-center">
            <blockquote className="m-0">
              <p className="m-0 font-serif text-[clamp(1.6rem,3.6vw,2.45rem)] italic leading-[1.26] tracking-[-0.012em] text-paper-900">
                “Don’t follow your dreams, follow your curiosity!”
              </p>
              <footer className="mt-4 font-serif text-[0.88rem] text-paper-700">
                <Out href="https://substack.com/home/post/p-148637074">And find your style</Out>
              </footer>
            </blockquote>

            <span aria-hidden className="mx-auto mt-14 block h-px w-16 bg-paper-900/25" />

            <h2
              id="close-title"
              className="mt-16 font-serif text-3xl tracking-[-0.016em] text-paper-900"
            >
              {closing.title}
            </h2>
            <p className="mt-3 font-serif text-paper-700">{closing.body}</p>
            <p className="mt-5 font-serif text-[1.02rem]">
              {closing.links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && <span className="text-paper-300"> · </span>}
                  <Out href={l.href}>{l.label}</Out>
                </span>
              ))}
            </p>

            <p className="mt-20 font-serif text-[0.72rem] uppercase tracking-[0.26em] text-paper-700">
              <Out href={notionHome}>Also on Notion</Out>
            </p>
          </div>

          <Folio page={120} />
        </section>
      </main>
    </div>
  );
}

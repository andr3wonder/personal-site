import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { LensSwitcher } from '../../components/LensSwitcher';
import { useActiveSection } from '../../hooks/useActiveSection';
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
    className="rule-link text-jade-50 hover:text-cyanEdge"
  >
    {children}
  </a>
);

/**
 * The route, read chronologically rather than by category. This ordering is
 * unique to this lens: Taipei first, then Berkeley, then San Francisco.
 */
const stations = [
  { id: 'genz', code: 'ST 01', name: 'GenZ Taiwan', place: 'Taipei' },
  { id: 'clubs', code: 'ST 02', name: 'Rooms Built', place: 'Taipei · Berkeley' },
  { id: 'work', code: 'ST 03', name: 'Internships', place: 'Berkeley' },
  { id: 'blaze', code: 'ST 04', name: 'Blaze Messenger', place: 'Berkeley' },
  { id: 'feelable', code: 'ST 05', name: 'feelable.ai', place: 'San Francisco' },
  { id: 'priorities', code: 'ST 06', name: 'Priorities', place: 'Through-line' },
  { id: 'about', code: 'ST 07', name: 'About', place: 'San Francisco' },
  { id: 'reads', code: 'ST 08', name: 'Info Diet', place: 'Ongoing' },
  { id: 'hobbies', code: 'ST 09', name: 'Off the Line', place: 'Ongoing' },
  { id: 'content', code: 'ST 10', name: 'Published', place: 'Ongoing' },
];

const stationIds = stations.map((s) => s.id);

/** Split-flap heading. Characters settle in sequence, as on a departure board. */
function Flap({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {text.split('').map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            initial={{ rotateX: -88, opacity: 0 }}
            animate={inView ? { rotateX: 0, opacity: 1 } : undefined}
            transition={{ delay: i * 0.02, duration: 0.32, ease: [0.2, 0.85, 0.3, 1] }}
            style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** The route line. One dot size, one exact interval, one drawn progress fill. */
function RouteLine({ active }: { active: string }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const idx = Math.max(0, stationIds.indexOf(active));
  const top = 6;
  const span = 88;
  const step = span / (stations.length - 1);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-8 z-30 hidden w-px lg:block">
      <span className="absolute inset-0 bg-jade-800" />
      {!reduced && (
        <motion.span
          className="absolute inset-x-0 top-0 h-full origin-top bg-cyanEdge/80"
          style={{ scaleY: draw }}
        />
      )}
      {stations.map((s, i) => (
        <span
          key={s.id}
          className={[
            'absolute -left-[2.5px] h-1.5 w-1.5 rounded-full transition-colors duration-300',
            i <= idx ? 'bg-cyanEdge' : 'bg-jade-800',
          ].join(' ')}
          style={{ top: `${top + i * step}%` }}
        />
      ))}
    </div>
  );
}

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="m-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full border border-jade-800 object-cover object-top"
      />
      <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-[0.14em] text-jade-100/65">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * A station. Every station uses the same rigid three-part grid: manifest column
 * on the left (code, place, media), content on the right. No side-swapping, so
 * the page reads as one table rather than a zigzag.
 */
function Station({
  id,
  code,
  name,
  place,
  children,
  media,
}: {
  id: string;
  code: string;
  name: string;
  place: string;
  children: React.ReactNode;
  media?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-name`}
      className="mx-auto w-full max-w-6xl px-5 py-rhythm3 sm:px-8 sm:py-rhythm4 lg:pl-24"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.48, ease: [0.18, 0.82, 0.26, 1] }}
      >
        <div className="mb-9 border-b border-jade-800 pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="font-mono text-xs uppercase tracking-[0.2em] tabular-nums text-cyanEdge">
              {code}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-jade-100/60">
              {place}
            </span>
          </div>
          <h2
            id={`${id}-name`}
            className="mt-2 font-transit text-[clamp(1.7rem,4.2vw,2.8rem)] font-medium uppercase leading-[1.02] tracking-[0.015em] text-jade-50"
          >
            <Flap text={name} />
          </h2>
        </div>

        <div className="grid gap-x-12 gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">{children}</div>
          {media && <div className="min-w-0">{media}</div>}
        </div>
      </motion.div>
    </section>
  );
}

/** Full-measure row, used when there is no genuine label data to show. */
function Line({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-jade-800 py-3.5 text-jade-100/90 last:border-b">{children}</div>;
}

/** Rigid two-column data row, the unit this whole lens is built from. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-jade-800 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-jade-100/55">{label}</span>
      <span className="text-jade-100/90">{children}</span>
    </div>
  );
}

export function LineLens() {
  useLensTheme('hsl(160 34% 6%)', 'dark');
  const active = useActiveSection(stationIds);
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroP, [0, 1], ['0%', '20%']);

  const blaze = products[0];
  const feelable = products[1];
  const genz = communities.find((c) => c.id === 'genz')!;
  const clubs = communities.filter((c) => c.id !== 'genz');
  const travel = hobbies.find((h) => h.id === 'travel')!;
  const cooking = hobbies.find((h) => h.id === 'cooking')!;
  const st = Object.fromEntries(stations.map((s) => [s.id, s]));

  return (
    <div className="min-h-screen bg-jade-950">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <LensSwitcher variant="line" />
      <RouteLine active={active} />

      <main id="main">
        {/* ------------------------------------------------------- departures */}
        <section
          id="open"
          ref={heroRef}
          aria-labelledby="hero-name"
          className="relative flex min-h-[100svh] items-center overflow-hidden lg:pl-24"
        >
          <motion.div aria-hidden className="absolute inset-0" style={reduced ? undefined : { y: heroY }}>
            <img
              src={photos.hero.src}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-[122%] w-full object-cover object-[74%_50%] sm:object-[62%_50%] lg:object-center"
            />
            {/* Cyan never sits over the photograph. A flat scrim keeps every
                line of hero type above 7:1 against near-white. */}
            <div className="absolute inset-0 bg-jade-950/82" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-jade-950 to-transparent" />
          </motion.div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-jade-50/80">
              Departures
            </p>

            <h1
              id="hero-name"
              className="mt-6 font-transit text-[clamp(2.8rem,10vw,7rem)] font-semibold uppercase leading-[0.92] tracking-[0.01em] text-jade-50"
            >
              <Flap text="Andrew Chuang" />
            </h1>
            <p className="mt-2 font-sans text-[clamp(1.1rem,3vw,1.9rem)] font-light tracking-[0.28em] text-jade-50/85">
              {identity.nameZh}
            </p>

            <table className="mt-11 w-full max-w-xl border-collapse text-left font-mono text-xs uppercase tracking-[0.1em] tabular-nums sm:text-sm">
              <caption className="sr-only">Where Andrew has lived and studied</caption>
              <tbody>
                {[
                  ['TPE', 'Taipei, Taiwan', 'Born'],
                  ['BER', 'Berkeley, CS', 'Studied'],
                  ['SFO', 'San Francisco', 'Now'],
                ].map(([code, place, note]) => (
                  <tr key={code} className="border-t border-jade-100/25 last:border-b">
                    <th scope="row" className="w-20 py-3 pr-4 font-medium text-jade-50">
                      {code}
                    </th>
                    <td className="py-3 pr-4 text-jade-50/90">
                      {place}
                      <span className="ml-2 text-jade-50/60 sm:hidden">{note}</span>
                    </td>
                    <td className="hidden w-24 py-3 text-right text-jade-50/70 sm:table-cell">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-jade-50/90">
              {mission.headline}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- ST 01 */}
        <Station
          {...st.genz}
          media={
            <div className="space-y-6">
              <Shot src={genz.images![0].src} alt={genz.images![0].alt} caption="The room" />
              <Shot src={genz.images![1].src} alt={genz.images![1].alt} caption="Stage, before doors" />
            </div>
          }
        >
          <p className="max-w-measure text-jade-100/85">
            Founder. The first stop on this line: getting students across Taiwan into the same room.
          </p>
          <div className="mt-7">
            {genz.bullets!.map((b) => (
              <Line key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</Line>
            ))}
            <Row label="Elsewhere">
              {genz.links!.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && <span className="text-jade-100/30"> · </span>}
                  <Out href={l.href}>{l.label}</Out>
                </span>
              ))}
            </Row>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 02 */}
        <Station
          {...st.clubs}
          media={<Shot src={genz.images![2].src} alt={genz.images![2].alt} caption="Defying Gravity" />}
        >
          {clubs.map((c) => (
            <Row key={c.id} label={c.role}>
              {c.href ? <Out href={c.href}>{c.name}</Out> : c.name}
            </Row>
          ))}
        </Station>

        {/* ---------------------------------------------------------- ST 03 */}
        <Station
          {...st.work}
          media={<Shot src={genz.images![3].src} alt={genz.images![3].alt} caption="Mid-session" />}
        >
          {work.map((w) => (
            <Row key={w.name} label={w.role}>
              <Out href={w.href}>{w.name}</Out>
              <span className="ml-2 text-jade-100/55">{w.note}</span>
            </Row>
          ))}
        </Station>

        {/* ---------------------------------------------------------- ST 04 */}
        <Station
          {...st.blaze}
          media={
            <div className="space-y-6">
              <Shot src={blaze.images[0].src} alt={blaze.images[0].alt} caption="Onboarding flow" />
              <Shot src={blaze.images[1].src} alt={blaze.images[1].alt} caption="On the wrist" />
            </div>
          }
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-jade-100/55">
            {blaze.kicker}
          </p>
          <p className="mt-2 font-transit text-[clamp(2rem,5vw,3rem)] font-semibold uppercase leading-none text-jade-50">
            200k <span className="text-cyanEdge">users</span>
          </p>
          <div className="mt-7">
            {blaze.bullets.map((b) => (
              <Line key={b}>{b}</Line>
            ))}
            <Row label="Detail">
              <Out href={blaze.href!}>Case notes</Out>
            </Row>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 05 */}
        <Station
          {...st.feelable}
          media={
            <div className="space-y-6">
              <Shot src={feelable.images[1].src} alt={feelable.images[1].alt} caption="Mood picker" />
              <Shot src={feelable.images[2].src} alt={feelable.images[2].alt} caption="Dashboard" />
            </div>
          }
        >
          <p className="max-w-measure text-jade-100/85">
            A mood journaling companion — a journal partner that remembers and grows with you.
          </p>
          <div className="mt-7">
            <Row label="Also">Vibecode Playground, for everything still half-built</Row>
            <Row label="Live">
              <Out href={feelable.href!}>feelable.ai</Out>
            </Row>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 06 */}
        <Station
          {...st.priorities}
          media={<Shot src={photos.tunnel.src} alt={photos.tunnel.alt} caption="En route" />}
        >
          <p className="max-w-measure text-jade-100/85">
            Five, in order. <Out href={priorities.articleHref}>Written on a train to Strasbourg</Out>.
          </p>
          <div className="mt-7">
            {priorities.items.map((p, i) => (
              <Row key={p.label} label={String(i + 1).padStart(2, '0')}>
                <span className="text-jade-50">{p.label}</span>{' '}
                <span className="text-jade-100/60">{p.body}</span>
              </Row>
            ))}
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 07 */}
        <Station
          {...st.about}
          media={<Shot src={photos.portrait.src} alt={photos.portrait.alt} caption="Grand Canyon" />}
        >
          <p className="max-w-measure text-jade-100/85">
            {identity.tagline} {identity.taglineTail}
          </p>
          <p className="mt-5 max-w-measure text-jade-100/60">
            “Have the courage to become a novice again and again and be in a constant state of
            growing, changing, and reinventing yourself.”
          </p>
          <div className="mt-7">
            {aboutFacts.map((f, i) => (
              <Row key={f.text} label={['Based', 'Origin', 'Cares for'][i] ?? 'Note'}>
                {f.text}
              </Row>
            ))}
            <Row label="Also kept">
              {notebooks.map((n, i) => (
                <span key={n.href}>
                  {i > 0 && <span className="text-jade-100/30"> · </span>}
                  <Out href={n.href}>{n.label}</Out>
                </span>
              ))}
            </Row>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 08 */}
        <Station {...st.reads}>
          <p className="max-w-measure text-jade-100/80">{readsIntro}</p>
          <p className="mt-5">
            <Out href={infoDietHref}>The full Info Diet, in Notion</Out>
          </p>
        </Station>

        <div className="mx-auto -mt-rhythm3 w-full max-w-6xl px-5 pb-rhythm4 sm:px-8 lg:pl-24">
          <dl className="grid gap-x-12 md:grid-cols-2">
            {reads.map((r) => (
              <div key={r.label} className="border-t border-jade-800 py-3.5">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-cyanEdge">
                  {r.label}
                </dt>
                <dd className="m-0 mt-1.5 text-[0.94rem] leading-[1.7] text-jade-100/75">
                  {r.items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------------------------------------------------- ST 09 */}
        <Station
          {...st.hobbies}
          media={
            <div className="space-y-6">
              <Shot src={travel.image!.src} alt={travel.image!.alt} caption="SF half marathon" />
              <Shot src={cooking.image!.src} alt={cooking.image!.alt} caption="Meal prep, allegedly" />
            </div>
          }
        >
          <p className="font-mono text-sm tracking-[0.06em] text-jade-100/80">{travel.note}</p>
          <div className="mt-6">
            {travel.bullets!.map((b) => (
              <Line key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</Line>
            ))}
            {hobbies
              .filter((h) => h.id !== 'travel')
              .map((h) => (
                <Row key={h.id} label={h.label}>
                  {h.stat && <span className="text-cyanEdge">{h.stat}</span>}
                  {h.stat && h.note && <span className="text-jade-100/30"> · </span>}
                  {h.note && <span className="text-jade-100/70">{h.note}</span>}
                  {h.links?.map((l) => (
                    <span key={l.href}>
                      <span className="text-jade-100/30"> · </span>
                      <Out href={l.href}>{l.label}</Out>
                    </span>
                  ))}
                </Row>
              ))}
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 10 */}
        <Station
          {...st.content}
          media={<Shot src={hobbies[0].image!.src} alt={hobbies[0].image!.alt} caption="Essays on Medium" />}
        >
          <p className="font-transit text-[clamp(2rem,5vw,3rem)] font-semibold uppercase leading-none text-jade-50">
            1M+ <span className="text-cyanEdge">views</span>
          </p>
          <div className="mt-7">
            {guides.map((g) => (
              <Row key={g.href} label="Guide">
                <Out href={g.href}>{g.label}</Out>
                {guideNotes[g.label] && (
                  <span className="ml-2 text-jade-100/55">{guideNotes[g.label]}</span>
                )}
              </Row>
            ))}
            {channels.map((c) => (
              <Row key={c.href} label={c.label}>
                <Out href={c.href}>{c.handle}</Out>
                {c.meta && <span className="ml-2 text-jade-100/45">{c.meta}</span>}
              </Row>
            ))}
          </div>
          <p className="sr-only">{contentStat}</p>
        </Station>

        {/* --------------------------------------------------------- terminus */}
        <section
          id="close"
          aria-labelledby="close-title"
          className="mx-auto w-full max-w-6xl px-5 py-rhythm4 sm:px-8 lg:pl-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyanEdge">Terminus</p>

          <blockquote className="m-0 mt-9 max-w-3xl">
            <p className="m-0 font-transit text-[clamp(1.9rem,5.4vw,3.4rem)] font-medium uppercase leading-[1.04] text-jade-50">
              Don’t follow your dreams, follow your curiosity!
            </p>
            <footer className="mt-4 text-sm text-jade-100/60">
              <Out href="https://substack.com/home/post/p-148637074">And find your style</Out>
            </footer>
          </blockquote>


          <h2
            id="close-title"
            className="mt-16 font-transit text-3xl font-semibold uppercase tracking-[0.02em] text-jade-50"
          >
            {closing.title}
          </h2>
          <p className="mt-3 max-w-xl text-jade-100/75">{closing.body}</p>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.16em]">
            {closing.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && <span className="text-jade-100/30"> · </span>}
                <Out href={l.href}>{l.label}</Out>
              </span>
            ))}
          </p>

          <p className="mt-20 font-mono text-xs uppercase tracking-[0.28em] text-jade-100/70">
            <a href={notionHome} target="_blank" rel="noreferrer" className="rule-link">
              Also on Notion
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

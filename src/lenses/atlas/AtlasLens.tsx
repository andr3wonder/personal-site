import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EditionFooter } from '../../components/EditionFooter';
import { useLensTheme } from '../../hooks/useLensTheme';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  blazeMetrics,
  channels,
  closing,
  communities,
  guides,
  hobbies,
  identity,
  infoDietHref,
  mission,
  notebooks,
  photos,
  priorities,
  products,
  reads,
  readsIntro,
  work,
} from '../../data/content';

const EASE = [0.16, 0.84, 0.24, 1] as const;

function AtlasMark({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 92 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 21C4 9 15 4 25 4c11 0 19 7 19 17s-8 17-19 17C15 38 4 33 4 21Z" />
      <path d="M48 21C48 9 59 4 69 4c11 0 19 7 19 17s-8 17-19 17c-10 0-21-5-21-17Z" />
      <path d="M25 21h44" />
    </svg>
  );
}

function Out({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`atlas-tactile-link ${className}`}>
      {children} <span aria-hidden>↗</span>
    </a>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 text-[#eee3cc]">
      <nav aria-label="Moving Atlas chapters" className="mx-auto flex max-w-[1560px] items-center justify-between px-5 py-5 sm:px-8 md:px-12">
        <a href="#open" className="pointer-events-auto flex items-center gap-3 rounded-sm">
          <AtlasMark className="atlas-mark h-5 w-11" />
          <span className="font-reel text-[10px] font-medium uppercase tracking-[0.2em]">A.C.</span>
        </a>
        <div className="pointer-events-auto flex items-center gap-5 text-[#eee3cc]/80 sm:gap-8">
          <a href="#taipei" className="atlas-link rounded-sm font-reel text-[10px] font-medium uppercase tracking-[0.18em]">Taipei</a>
          <a href="#build" className="atlas-link rounded-sm font-reel text-[10px] font-medium uppercase tracking-[0.18em]">Build</a>
          <a href="#close" className="atlas-link rounded-sm font-reel text-[10px] font-medium uppercase tracking-[0.18em]">Close</a>
        </div>
      </nav>
    </header>
  );
}

function OpeningDesktop() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const coverRotate = useTransform(scrollYProgress, [0.04, 0.34], [0, -110]);
  const coverShade = useTransform(scrollYProgress, [0.06, 0.3], [0, 0.58]);
  const pageScale = useTransform(scrollYProgress, [0.56, 0.88], [1, 1.12]);
  const pageFade = useTransform(scrollYProgress, [0.96, 1], [1, 0]);
  const portalScale = useTransform(scrollYProgress, [0.6, 0.93], [1, 15]);
  const copyOpacity = useTransform(scrollYProgress, [0.24, 0.4, 0.94, 1], [0, 1, 1, 0]);

  return (
    <section id="open" ref={ref} aria-labelledby="atlas-title" className="atlas-opening atlas-opening-desktop">
      <div className="atlas-opening-sticky">
        <motion.div className="atlas-frontispiece" style={{ scale: pageScale, opacity: pageFade }}>
          <div aria-hidden className="atlas-relief atlas-relief-far" />
          <div aria-hidden className="atlas-relief atlas-relief-near" />
          <div className="atlas-frontispiece-top"><span>Sheet 02 · 25.0330° N 121.5654° E</span><span>The Moving Atlas</span></div>
          <motion.div className="atlas-joy-title" style={{ opacity: copyOpacity }}>
            <h1 id="atlas-title">
              <span>Foster</span>
              <span className="atlas-joy-word">J<motion.i className="atlas-joy-aperture" style={{ scale: portalScale }}><img src="/img/genz-group.jpg" alt="" /></motion.i>Y</span>
              <span>For Humanity</span>
            </h1>
          </motion.div>
          <motion.div className="atlas-frontispiece-foot" style={{ opacity: copyOpacity }}>
            <div><strong>{identity.name}</strong><span>{identity.fullNameZh}</span><small>{identity.role} at {identity.employer}</small></div>
            <div><small>{identity.bornIn} · Now {identity.basedIn}</small><b>02&nbsp;&nbsp;20&nbsp;&nbsp;47</b></div>
          </motion.div>
        </motion.div>
        <motion.div className="atlas-cloth-cover" style={{ rotateY: coverRotate, transformOrigin: 'left center', transformStyle: 'preserve-3d' }}>
          <div className="atlas-cover-spine" />
          <div className="atlas-cover-frame">
            <p>Plate 02 · Edition 20</p>
            <h2>Andrew<br />Chuang</h2>
            <span lang="zh-Hant">{identity.fullNameZh}</span>
            <i />
            <small>Taipei → Berkeley → San Francisco</small>
          </div>
          <motion.span className="atlas-cover-shade" style={{ opacity: coverShade }} />
          <em>Scroll to open</em>
        </motion.div>
      </div>
    </section>
  );
}

function OpeningMobile() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const flapRotate = useTransform(scrollYProgress, [0.04, 0.34], [0, -104]);
  const portalScale = useTransform(scrollYProgress, [0.6, 0.93], [1, 22]);
  const copyOpacity = useTransform(scrollYProgress, [0.22, 0.4, 0.94, 1], [0, 1, 1, 0]);

  return (
    <section id="open-mobile" ref={ref} aria-labelledby="atlas-mobile-title" className="atlas-opening atlas-opening-mobile">
      <div className="atlas-opening-sticky">
        <div className="atlas-mobile-frontispiece">
          <p>Sheet 02<br />25.0330° N<br />121.5654° E</p>
          <motion.div style={{ opacity: copyOpacity }}>
            <h1 id="atlas-mobile-title"><span>Foster</span><span>J<motion.i className="atlas-joy-aperture" style={{ scale: portalScale }}><img src="/img/genz-group.jpg" alt="" /></motion.i>Y</span><span>For<br />Humanity</span></h1>
            <div className="atlas-mobile-frontispiece-foot"><strong>{identity.name}</strong><span>{identity.fullNameZh}</span><small>{identity.role} at {identity.employer}</small><b>02&nbsp;&nbsp;20&nbsp;&nbsp;47</b></div>
          </motion.div>
        </div>
        <motion.div className="atlas-mobile-flap" style={{ rotateX: flapRotate, transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}>
          <p>Plate 02 · Edition 20</p>
          <h2>Andrew<br />Chuang</h2>
          <span lang="zh-Hant">{identity.fullNameZh}</span>
          <i />
          <small>Taipei → Berkeley<br />→ San Francisco</small>
          <em>Scroll to unfold</em>
        </motion.div>
      </div>
    </section>
  );
}

function StaticOpening() {
  return (
    <section id="open" aria-labelledby="atlas-static-title" className="atlas-opening-static">
      <div className="atlas-cloth-cover">
        <div className="atlas-cover-spine" />
        <div className="atlas-cover-frame">
          <p>Plate 02 · Edition 20</p>
          <h1 id="atlas-static-title">Andrew<br />Chuang</h1>
          <span lang="zh-Hant">{identity.fullNameZh}</span>
          <i />
          <small>Taipei → Berkeley → San Francisco</small>
        </div>
      </div>
      <div className="atlas-static-next"><img src="/img/genz-group.jpg" alt="A large group of GenZ Taiwan participants crowded together for a photo in a bright workshop space, holding handmade signs." /><p>Sheet 02 · Taipei follows</p></div>
    </section>
  );
}

function AtlasOpening() {
  const reduced = useReducedMotion();
  if (reduced) return <StaticOpening />;
  return <><OpeningDesktop /><OpeningMobile /></>;
}

function TaipeiChapter() {
  const chapter = communities.find((community) => community.id === 'genz')!;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return (
    <section id="taipei" ref={ref} aria-labelledby="taipei-title" className="atlas-chapter atlas-taipei-chapter">
      <div className="atlas-taipei-landing">
        <motion.img src={chapter.images![0].src} alt={chapter.images![0].alt} loading="eager" style={reduced ? undefined : { y: imageY }} />
        <div className="atlas-taipei-landing-shade" />
        <div className="atlas-taipei-landing-meta"><span>Chapter I · 臺北 Taipei</span><span>Sheet 02 of 47</span></div>
        <div className="atlas-taipei-landing-title"><span>02</span><h2>Put people in<br />the same room.</h2><p>GenZ Taiwan · Founder</p></div>
      </div>
      <div className="atlas-chapter-intro">
        <p className="atlas-kicker">Chapter one <span>02 / 20 / 47</span></p>
        <div className="atlas-title-row"><h2 id="taipei-title">Taipei</h2><AtlasMark className="atlas-mark h-7 w-14" /></div>
        <p className="atlas-deck">The first map was always people. In Taiwan, community came before product.</p>
      </div>
      <div className="atlas-spread">
        <article className="atlas-story-page">
          <div className="atlas-story-topline"><span>01</span><span>Origins</span><span>47</span></div>
          <p className="atlas-story-eyebrow">GenZ Taiwan</p>
          <h3>Put people in the same room.</h3>
          <p className="atlas-story-copy">A nonprofit built to connect students across Taiwan for passion projects. The work began with a simple belief: momentum is made together.</p>
          <div className="atlas-facts" aria-label="GenZ Taiwan milestones">
            <p><strong>100</strong><span>People at the first cross-school TEDx</span></p>
            <p><strong>2k</strong><span>Instagram and podcast followers</span></p>
          </div>
          <Out href={chapter.href!} className="atlas-story-link">Visit GenZ Taiwan</Out>
        </article>
        <div className="atlas-terrain-page">
          <motion.figure className="atlas-main-photo" initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }} whileInView={reduced ? undefined : { clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.15, ease: EASE }}>
            <motion.img src={chapter.images![0].src} alt={chapter.images![0].alt} loading="eager" style={reduced ? undefined : { y: imageY }} />
          </motion.figure>
          <figure className="atlas-small-photo atlas-small-photo-top"><img src={chapter.images![1].src} alt={chapter.images![1].alt} loading="lazy" /></figure>
          <figure className="atlas-small-photo atlas-small-photo-bottom"><img src={chapter.images![3].src} alt={chapter.images![3].alt} loading="lazy" /></figure>
          <div aria-hidden className="atlas-route atlas-chapter-route" />
          <p className="atlas-photo-note">Taipei to a room full of possibility</p>
        </div>
      </div>
    </section>
  );
}

function CommunityRoute() {
  const communitiesAfterTaipei = communities.filter((community) => community.id !== 'genz');
  return (
    <section className="atlas-route-chapter atlas-dark-chapter" aria-labelledby="community-title">
      <Reveal className="atlas-route-heading">
        <p className="atlas-kicker">Coordinate 02</p>
        <h2 id="community-title">Communities are the first infrastructure.</h2>
        <p>{mission.paragraphs[0]}</p>
      </Reveal>
      <div className="atlas-community-cards">
        {communitiesAfterTaipei.map((community, index) => (
          <article key={community.id} className={`atlas-community-card atlas-community-card-${index + 1}`}>
            <span>0{index + 2}</span>
            <h3>{community.name}</h3>
            <p>{community.role}</p>
            {community.href && <Out href={community.href}>Open field note</Out>}
          </article>
        ))}
      </div>
    </section>
  );
}

function BerkeleyAndBlaze() {
  const blaze = products.find((product) => product.id === 'blaze')!;
  return (
    <section id="build" className="atlas-build-chapter" aria-labelledby="build-title">
      <div className="atlas-berkeley-bridge">
        <Reveal>
          <p className="atlas-kicker">Coordinate 03. Berkeley</p>
          <h2 id="build-title">A place to make ideas move.</h2>
          <p>{mission.paragraphs[1]}</p>
        </Reveal>
        <div aria-hidden className="atlas-berkeley-orbit">
          <span>UC Berkeley</span>
          <AtlasMark className="atlas-mark" />
        </div>
        <div aria-hidden className="atlas-bridge-line"><span>02</span><span>20</span><span>47</span></div>
      </div>
      <div className="atlas-blaze-spread">
        <div className="atlas-blaze-portrait">
          <img src="/img/blaze-watch-detail.jpg" alt="Blaze Messenger on Apple Watch, showing a voice message with transcription and playback controls." loading="lazy" />
          <p><span>200k</span> users</p>
        </div>
        <Reveal className="atlas-blaze-copy">
          <p className="atlas-kicker">Product fieldwork</p>
          <h2>{blaze.name}</h2>
          <p className="atlas-product-deck">{blaze.kicker}. An LLM-powered messaging agent that messages for you by voice.</p>
          <dl className="atlas-metric-grid">
            {blazeMetrics.slice(0, 3).map((metric) => (
              <div key={metric.metric}><dt>{metric.metric}</dt><dd>{metric.value}</dd></div>
            ))}
          </dl>
          <Out href={blaze.href!}>Read the project</Out>
        </Reveal>
        <div className="atlas-blaze-wide">
          <img src={blaze.images[0].src} alt={blaze.images[0].alt} loading="lazy" />
        </div>
      </div>
      <div className="atlas-blaze-notes">
        {blaze.bullets.map((bullet, index) => <p key={bullet}><span>0{index + 1}</span>{bullet}</p>)}
      </div>
    </section>
  );
}

function FeelableChapter() {
  const feelable = products.find((product) => product.id === 'feelable')!;
  const vibecode = products.find((product) => product.id === 'vibecode')!;
  return (
    <section className="atlas-feelable-chapter" aria-labelledby="feelable-title">
      <Reveal className="atlas-feelable-heading">
        <p className="atlas-kicker">Coordinate 04</p>
        <h2 id="feelable-title">feelable.ai</h2>
        <p>{feelable.kicker}.</p>
      </Reveal>
      <div className="atlas-feelable-gallery">
        <figure className="atlas-feelable-primary"><img src={feelable.images[0].src} alt={feelable.images[0].alt} loading="lazy" /></figure>
        <figure className="atlas-feelable-secondary"><img src={feelable.images[2].src} alt={feelable.images[2].alt} loading="lazy" /></figure>
        <figure className="atlas-feelable-tertiary"><img src={feelable.images[1].src} alt={feelable.images[1].alt} loading="lazy" /></figure>
        <div className="atlas-feelable-link"><Out href={feelable.href!}>Enter feelable.ai</Out><p>Also building: {vibecode.name}</p></div>
      </div>
    </section>
  );
}

function WorkAndSanFrancisco() {
  const travel = hobbies.find((hobby) => hobby.id === 'travel')!;
  return (
    <section className="atlas-work-chapter" aria-labelledby="now-title">
      <div className="atlas-work-ledger">
        <p className="atlas-kicker">Coordinate 05. Work</p>
        {work.map((role, index) => (
          <article key={role.name}>
            <span>0{index + 1}</span>
            <h3><Out href={role.href}>{role.name}</Out></h3>
            <p>{role.note}</p>
            <p>{role.role}</p>
          </article>
        ))}
      </div>
      <div className="atlas-sf-panel">
        <figure><img src={travel.image!.src} alt={travel.image!.alt} loading="lazy" /></figure>
        <Reveal className="atlas-sf-copy">
          <p className="atlas-kicker">Coordinate 06. San Francisco</p>
          <h2 id="now-title">Still curious.</h2>
          <p>Now, I’m part of the <Out href={mission.inlineLinks.productBuilders}>{identity.cohort}</Out>.</p>
          <p className="atlas-sf-location">{identity.bornIn}<br />{identity.basedIn} · {identity.school}</p>
        </Reveal>
      </div>
    </section>
  );
}

function PrioritiesAndLibrary() {
  return (
    <section className="atlas-library-chapter" aria-labelledby="library-title">
      <Reveal className="atlas-priorities">
        <p className="atlas-kicker">Margin notes</p>
        <h2>{priorities.title}</h2>
        <a className="atlas-tactile-link" href={priorities.articleHref} target="_blank" rel="noreferrer">Written on a train to Strasbourg <span aria-hidden>↗</span></a>
        <ol>
          {priorities.items.map((priority, index) => <li key={priority.label}><span>0{index + 1}</span><strong>{priority.label}</strong><em>{priority.body}</em></li>)}
        </ol>
      </Reveal>
      <div className="atlas-reading-room">
        <p className="atlas-kicker">The library</p>
        <h2 id="library-title">Curiosity is a practice.</h2>
        <p className="atlas-reading-intro">{readsIntro}</p>
        <div className="atlas-read-grid">
          {reads.map((category) => <article key={category.label}><h3>{category.label}</h3><p>{category.items.join(' · ')}</p></article>)}
        </div>
        <div className="atlas-notebook-links">
          {notebooks.map((notebook) => <Out key={notebook.href} href={notebook.href}>{notebook.label}</Out>)}
          <Out href={infoDietHref}>Complete Info Diet</Out>
        </div>
      </div>
    </section>
  );
}

function SidePathsAndClosing() {
  const writing = hobbies.find((hobby) => hobby.id === 'writing')!;
  return (
    <section id="close" className="atlas-closing-chapter" aria-labelledby="close-title">
      <div className="atlas-side-paths">
        <p className="atlas-kicker">Side paths</p>
        <h2>Outside the margins.</h2>
        <div className="atlas-hobby-grid">
          {hobbies.map((hobby, index) => (
            <article key={hobby.id}>
              <span>0{index + 1}</span><h3>{hobby.label}</h3>
              {hobby.stat && <p className="atlas-hobby-stat">{hobby.stat}</p>}
              {hobby.note && <p>{hobby.note}</p>}
            </article>
          ))}
        </div>
        <div className="atlas-writing-links">
          {writing.essays!.map((essay) => <Out key={essay.href} href={essay.href}>{essay.title}</Out>)}
        </div>
      </div>
      <div className="atlas-contact-spread">
        <div className="atlas-contact-photo"><img src={photos.tunnel.src} alt={photos.tunnel.alt} loading="lazy" /></div>
        <Reveal className="atlas-contact-copy">
          <p className="atlas-kicker">The last page</p>
          <h2 id="close-title">{closing.title}</h2>
          <p>{closing.body}</p>
          <div className="atlas-contact-links">
            {closing.links.map((link) => <Out key={link.href} href={link.href}>{link.label}</Out>)}
          </div>
          <div className="atlas-channel-links">
            {channels.map((channel) => <Out key={channel.href} href={channel.href}>{channel.label}</Out>)}
            {guides.map((guide) => <Out key={guide.href} href={guide.href}>{guide.label}</Out>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AtlasLens() {
  useLensTheme('#153c2f', 'dark');
  return (
    <div className="atlas-root">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <AtlasOpening />
        <TaipeiChapter />
        <CommunityRoute />
        <BerkeleyAndBlaze />
        <FeelableChapter />
        <WorkAndSanFrancisco />
        <PrioritiesAndLibrary />
        <SidePathsAndClosing />
      </main>
      <EditionFooter variant="atlas" />
    </div>
  );
}

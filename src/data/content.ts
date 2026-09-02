/**
 * Single source of truth for every fact and link on this site.
 *
 * Every string below is taken from Andrew's public Notion page
 * (https://andrewcchuang.notion.site). Nothing here is invented. Light editing
 * for hierarchy is allowed; wording, numbers and links are not changed.
 *
 * The three lenses (Reel, Volume, Line) all render from this file.
 */

export type Link = { label: string; href: string };

export const identity = {
  name: 'Andrew Chuang',
  nameZh: '承翰',
  fullNameZh: '莊承翰',
  role: 'Product Builder',
  employer: 'LinkedIn',
  cohort: '1st cohort of Product Builders at LinkedIn',
  bornIn: 'Born and raised in Taipei, Taiwan',
  basedIn: 'San Francisco',
  school: 'Berkeley CS',
  tagline: 'The dance of tech, art & people make my heart sing.',
  taglineTail: 'To be a missionary & philosopher warrior.',
} as const;

export const mission = {
  headline: 'My mission is to foster joy for humanity.',
  paragraphs: [
    'I’m a creator at heart, I started by building communities in TW, connecting students to do passion projects.',
    'At UC Berkeley, I found my passion in building products: AI Voice Messenger. Now, I’m part of the 1st cohort of Product Builders at LinkedIn.',
    'Join me in bringing joy to the world 🥳',
  ],
  inlineLinks: {
    passionProjects: 'https://www.instagram.com/genz_taiwan/',
    aiVoiceMessenger: 'https://www.blazemessenger.com/home-en',
    productBuilders: 'https://linkedincareers.info/apbprogram/#faqs',
    linkedin: 'https://www.linkedin.com/in/andrew-chuang-903215192/',
  },
} as const;

export const priorities = {
  title: 'My Life Priorities',
  articleHref:
    'https://andrewcchuang.medium.com/all-i-need-for-life-written-on-a-train-to-strasbourg-845ac2a35a1f',
  items: [
    { icon: '💪', label: 'Physical Health', body: 'sleep, diet, exercise' },
    { icon: '🧠', label: 'Mental Health', body: 'know thyself, love thyself, untether thyself' },
    { icon: '👨‍👩‍👦‍👦', label: 'My Relationships', body: 'and their wellbeing' },
    { icon: '💻', label: 'Life’s Purpose', body: 'solve real problems for people with people I love' },
    { icon: '❤️', label: 'Making Others’ Lives Better', body: 'make something people want, something society needs' },
  ],
} as const;

export const aboutFacts: { icon: string; text: string }[] = [
  { icon: '📌', text: 'San Francisco (Berkeley CS 🐻)' },
  { icon: '🇹🇼', text: 'Born and raised in Taipei, Taiwan' },
  { icon: '🌉', text: 'I cherish books, cities, and communities' },
];

export const notebooks: Link[] = [
  { label: 'My Info Diet', href: 'https://andrewcchuang.notion.site/p/My-Info-Diet-097874201d9e418d8bab528ad69f93a6?pvs=24' },
  { label: 'My Writings', href: 'https://andrewcchuang.notion.site/p/My-Writings-2743f953bba980ffba94c50d5c9c9c54?pvs=24' },
  { label: 'My Mental Models', href: 'https://andrewcchuang.notion.site/p/My-Mental-Models-5bb8d950139c4a0782faa8b9f6e366f0?pvs=24' },
];

export type Product = {
  id: string;
  name: string;
  kicker: string;
  href?: string;
  role?: string;
  headline?: string;
  bullets: string[];
  images: { src: string; alt: string }[];
};

export const products: Product[] = [
  {
    id: 'blaze',
    name: 'Blaze Messenger',
    kicker: 'AI voice messenger',
    href: 'https://andrewcchuang.notion.site/p/2653f953bba980b092d4f2d9570da7c0?pvs=25',
    headline: '200k Users',
    bullets: [
      'Gained 110k 1st month installs & 10k DAUs by driving the 0-1 launch',
      'Did 25 usability tests, designed 100+ mockups, managed 70+ feature backlog',
      'Developed an LLM-powered messaging agent: messages for you by voice',
      'Boosted 30D retention by 12% by A/B testing 4-stage onboarding funnel',
    ],
    images: [
      {
        src: '/img/blaze-watch.jpg',
        alt: 'Four watch screens from Blaze Messenger showing a voice message from Lena being played back, transcribed, and expanded to full text.',
      },
    ],
  },
  {
    id: 'feelable',
    name: 'feelable.ai',
    kicker: 'a mood journaling companion 📓',
    href: 'https://www.feelable.ai/dashboard',
    bullets: [],
    images: [
      { src: '/img/feelable-mood-wheel.jpg', alt: 'feelable.ai mood picker, a colour wheel plotting energy against pleasantness, with the current reading marked “Cheerful”.' },
      { src: '/img/feelable-dashboard.jpg', alt: 'feelable.ai mood dashboard showing mood distribution, average energy and pleasantness, and most frequent emotions.' },
      { src: '/img/feelable-compose.jpg', alt: 'The feelable.ai writing screen, nearly empty, asking “What’s on your mind?” over a soft colour wash.' },
    ],
  },
  {
    id: 'vibecode',
    name: 'Vibecode Playground',
    kicker: '',
    bullets: [],
    images: [],
  },
];

export const work: { name: string; note: string; role: string; href: string }[] = [
  {
    name: 'Hewlett Packard Enterprise',
    note: 'Hybrid Cloud',
    role: 'PM Intern',
    href: 'https://www.linkedin.com/company/hewlett-packard-enterprise/posts/?feedView=all',
  },
  {
    name: 'ZEISS',
    note: 'Industry Leader in Optoelectronics',
    role: 'TPM Intern',
    href: 'https://www.linkedin.com/company/zeiss/mycompany/verification/',
  },
];

export type Community = {
  id: string;
  name: string;
  role: string;
  href?: string;
  bullets?: { text: string; href?: string }[];
  links?: Link[];
  images?: { src: string; alt: string }[];
};

export const communities: Community[] = [
  {
    id: 'genz',
    name: 'GenZ Taiwan',
    role: 'Nonprofit — Founder',
    href: 'https://www.instagram.com/genz_taiwan/',
    bullets: [
      { text: 'Held 1st TW cross-schooled TEDx event (100-pax) → connect likeminded students', href: 'https://www.ted.com/tedx/events/36338' },
      { text: 'Held NPO Leadership Seminars with TW Ministry of Tech', href: 'https://www.instagram.com/p/CKtuGTNMPjF/?img_index=2' },
      { text: 'Instagram and podcast, 2k followers' },
      { text: 'Partnership with TW Ministry of Technology' },
    ],
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/genz_taiwan/' },
      { label: 'Podcast', href: 'https://open.spotify.com/show/5znkbGp9J7CLzoRQet6EvQ' },
      { label: 'Story of GenZ', href: 'https://andrewchuang0110.medium.com/the-story-of-genz-taiwan-genz-%E7%9A%84%E6%95%85%E4%BA%8B-d3fa598bd735' },
      { label: 'GenZ Pitchdeck', href: 'https://docs.google.com/presentation/d/1bw3HK55vgLsOm7P3J3YbPp4fqhFgCpGWpGUfrJ6mN24/edit?usp=sharing' },
    ],
    images: [
      { src: '/img/genz-group.jpg', alt: 'A large group of GenZ Taiwan participants crowded together for a photo in a bright workshop space, holding handmade signs.' },
      { src: '/img/tedx-stage.jpg', alt: 'The TEDx stage set before an event: oversized red TEDx letters in front of a video wall of speaker portraits.' },
      { src: '/img/genz-defying-gravity.jpg', alt: 'Attendees gathered behind a purple “Defying Gravity” GenZ Taiwan banner at the end of a workshop.' },
      { src: '/img/genz-speaking.jpg', alt: 'Andrew speaking into a handheld microphone beside a presentation screen at a GenZ Taiwan session.' },
      { src: '/img/tedx-poster.jpg', alt: 'Event poster for TEDxYouth@RonxingGarden, 人間花火 Fireworks, showing a golden torch throwing sparks.' },
    ],
  },
  {
    id: 'bic',
    name: 'Berkeley International Consulting',
    role: 'President',
    href: 'https://berkeleyint.org/',
  },
  {
    id: 'ism',
    name: 'Intl. Student Map',
    role: 'Cofounder & Developer',
  },
  {
    id: 'eyes-english',
    name: 'Eyes English',
    role: 'English for Mandarin speakers — Cofounder',
    href: 'https://www.tiktok.com/@andrewcchuang',
  },
];

export const readsIntro =
  'Instead of following my dreams, I proactively follow where my curiosity takes me. Here are some books, podcasts, blogs that significantly shaped my worldview:';

export type ReadCategory = { icon: string; label: string; items: string[] };

export const reads: ReadCategory[] = [
  {
    icon: '🧘‍♀️',
    label: 'Self',
    items: ['Naval: Wealth & Happiness', 'Book of Joy', 'Untethered Soul', 'Startup of You', '7 Habits', 'Defining Decade'],
  },
  { icon: '🥗', label: 'Health', items: ['Huberman Lab', 'Why We Sleep', 'Atomic Habits'] },
  {
    icon: '❤️',
    label: 'Relationships',
    items: ['How to Know a Person', 'Nonviolent Communication', 'Crucial Conversations', 'Models'],
  },
  {
    icon: '🧠',
    label: 'Psychology & Behavior',
    items: ['Behave', 'Elephant in the Brain', 'Dopamine Nation', 'Thinking Fast and Slow', 'Hooked'],
  },
  {
    icon: '🧬',
    label: 'Humanity & Sociology',
    items: ['Sapiens', 'Singularity is Nearer', 'Homo Deus', 'Nexus', 'Outliers', 'Anxious Generation'],
  },
  {
    icon: '🌏',
    label: 'Society & Systems',
    items: [
      'Wealth and Poverty (Robert Reich)',
      'Principles: World Order',
      'Plurality: Collaborative Tech & Democracy',
      'Wait But Why',
      'Kurzgesagt',
    ],
  },
  {
    icon: '💻',
    label: 'Tech Products & Businesses',
    items: [
      'Acquired', '7 powers', 'Lex Fridman', 'Persona MBA', 'Cold Start', 'a16z', 'Stratechery', 'Every',
      'Build', 'Paul Graham', 'Don Norman', 'Apple', 'Airbnb', 'Disney', 'Meta', 'Amazon', 'Nvidia',
      'Netflix', 'Nike', 'Musk', 'Heptabase & Alan',
    ],
  },
  {
    icon: '📚',
    label: 'Fiction',
    items: [
      'The Alchemist', 'Little Prince', 'Siddartha', '3 Body Problem', 'Dark Forest',
      'Lonely Castle in the Mirror', '金庸武俠',
    ],
  },
  {
    icon: '🧧',
    label: 'Wealth',
    items: ['Psychology of Money', 'John Bogle', 'Naval Ravikant', 'Rich Dad Poor Dad', 'Gary Tan', 'my brother :)'],
  },
];

export const infoDietHref =
  'https://andrewcchuang.notion.site/bfa6cac6e9ac4d73bf5d31e6a6497333?v=022e8013b9b6429bb682727c2080ef9a&pvs=18';

export type Hobby = {
  id: string;
  icon: string;
  label: string;
  stat?: string;
  note?: string;
  links?: Link[];
  bullets?: { text: string; href?: string }[];
  image?: { src: string; alt: string };
};

export const hobbies: Hobby[] = [
  {
    id: 'writing',
    icon: '✍️',
    label: 'Writing',
    stat: '300k+ Reads',
    links: [
      { label: 'Threads', href: 'https://www.threads.net/@andrewcchuang?xmt=AQGzdGYo3K1EgA9nCCNhaepF7VlQhvV_MOXMEkjAJVOOYy4' },
      { label: 'Medium', href: 'https://medium.com/@andrewcchuang' },
    ],
    image: {
      src: '/img/medium-profile.jpg',
      alt: 'Andrew’s Medium profile, with the pinned essay “All I need for life (Written on a train to Strasbourg)” at the top.',
    },
  },
  {
    id: 'film',
    icon: '🎬',
    label: 'Movies & TV',
    stat: '650+ films',
    note: 'Favorites: La La Land (2016), Before Sunset (2004), Interstellar (2014), Forrest Gump (1994).',
    links: [{ label: 'Letterboxd', href: 'https://boxd.it/5mzgD' }],
  },
  {
    id: 'reading',
    icon: '📚',
    label: 'Reading',
    stat: '200+ books',
    note: '295 books on Goodreads, currently reading Principles For Dealing With the Changing World Order by Ray Dalio.',
    links: [{ label: 'Goodreads', href: 'https://www.goodreads.com/user/show/63079892-andrew' }],
  },
  {
    id: 'travel',
    icon: '🏔️',
    label: 'Travel',
    note: '🇹🇼🇯🇵🇺🇸🇩🇪🇦🇹🇨🇿🇭🇰🇫🇷🇭🇺🇨🇭🇳🇱🇧🇪🇵🇦🇲🇽🇵🇫🇵🇷',
    bullets: [
      { text: 'Hitchhiked in Taiwan (USD 15)', href: 'https://andrewcchuang.substack.com/p/2021-2-17-20-76318a567869' },
      { text: 'Solo backpacked in Europe' },
      { text: 'SF 1st Half Marathon 🏆' },
      { text: 'Biked 111 Miles in East Shore TW', href: 'https://medium.com/@Felix.helps.you/%E5%8F%B0%E6%9D%B1-%E8%8A%B1%E8%93%AE%E5%96%AE%E8%BB%8A%E6%97%85%E8%A1%8C-2023-6-e11706ff1c97' },
      { text: 'Climbed Mt Fuji', href: 'https://www.youtube.com/watch?v=y_dcX6zxTAQ' },
      { text: 'Swam across Sun Moon Lake', href: 'https://www.youtube.com/watch?v=y_dcX6zxTAQ' },
    ],
    image: {
      src: '/img/sf-half-marathon.jpg',
      alt: 'Andrew grinning in a bib and cap, packed into the crowd at the start of the San Francisco half marathon.',
    },
  },
  { id: 'dance', icon: '💃', label: 'Salsa / Bachata', note: 'a rookie but lovin’ it' },
  { id: 'sports', icon: '🏓', label: 'Sports', note: 'Loving 🏀🏓🏋️🏊‍♂️🏃🚴 — I play 🏐🏸⚾️🎳🥒 too~' },
  { id: 'acting', icon: '🎭', label: 'Acting', note: 'I tried acting too!' },
  {
    id: 'cooking',
    icon: '🥘',
    label: 'Cooking',
    note: 'tbh i meal prep',
    image: {
      src: '/img/beef-wellington.jpg',
      alt: 'A beef wellington sliced open on a wooden board, pastry crisp and the beef still rare in the middle.',
    },
  },
  { id: 'drawing', icon: '🎨', label: 'Drawing', note: 'just 4 fun' },
];

export const contentStat = '1M+ Views';

export const guides: Link[] = [
  { label: 'Product Prep Guide', href: 'https://andrewcchuang.notion.site/p/Product-Prep-Guide-Andrew-d261fc3c3b6d46849679fe9977b78bae?pvs=24' },
  { label: 'User Research Workshop', href: 'https://andrewcchuang.notion.site/p/User-Research-Workshop-Andrew-8116fe8dfaa44f38bed576c62e813785?pvs=24' },
  { label: 'Startup Notes', href: 'https://andrewcchuang.notion.site/p/Startup-Notes-Andrew-b506d11dd661439f9653524e0eb03405?pvs=24' },
];

export const guideNotes: Record<string, string> = {
  'Product Prep Guide': 'My guide on Product Recruiting',
};

export type Channel = Link & { handle: string; meta?: string };

export const channels: Channel[] = [
  { label: 'Threads', handle: '@andrewcchuang', href: 'https://www.threads.com/@andrewcchuang', meta: '961 Followers' },
  { label: 'Instagram', handle: '@andrewcchuang', href: 'https://www.instagram.com/andrewcchuang/' },
  { label: 'Medium', handle: 'Andrew Chuang 莊承翰', href: 'https://medium.com/@andrewcchuang' },
  { label: 'Substack', handle: 'And find your style', href: 'https://substack.com/home/post/p-148637074' },
  { label: 'TikTok', handle: '@andrewcchuang', href: 'https://www.tiktok.com/@andrewcchuang', meta: '3774 Followers · 40.8k Likes' },
  { label: 'YouTube', handle: 'Andrew Chuang 莊承翰', href: 'https://www.youtube.com/channel/UCh3GVc6727OrShOgzoC2AeA' },
];

export const quotes = [
  { text: 'Don’t follow your dreams, follow your curiosity!', href: 'https://substack.com/home/post/p-148637074' },
  {
    text: 'Have the courage to become a novice again and again and be in a constant state of growing, changing, and reinventing yourself.',
  },
] as const;

export const closing = {
  title: 'Let’s Chat',
  body: 'If you think we have mutual interests or would like to chat, DM me on Instagram, LinkedIn',
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/andrewcchuang/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-chuang-903215192/' },
  ] as Link[],
} as const;

export const notionHome = 'https://andrewcchuang.notion.site';

export const photos = {
  hero: {
    src: '/img/hero-paddleboard.jpg',
    alt: 'Andrew standing on a paddleboard far out on open ocean at sunrise, one hand raised to shade his eyes as he looks toward the horizon.',
  },
  portrait: {
    src: '/img/portrait-grand-canyon.jpg',
    alt: 'Andrew smiling at the camera on the rim of the Grand Canyon, wearing a navy sherpa-collar jacket.',
  },
  tunnel: {
    src: '/img/light-tunnel.jpg',
    alt: 'Andrew looking back over his shoulder while standing inside a mirrored tunnel lit in magenta and gold.',
  },
} as const;

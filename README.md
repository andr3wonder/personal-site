# Andrew Chuang 承翰 — personal site

Three complete interpretations of one truthful set of content. Same facts, same
links, same photographs; three different compositions, type systems, transition
grammars and interaction models.

| Route | Version | What it is |
| --- | --- | --- |
| `/` and `/reel` | **Reel** | Eight scenes, cut like a film. Full-bleed stills, a sprocket scrubber down the left edge, and an end-credits roll that carries the reading list, hobbies and channels. |
| `/volume` | **Volume** | Ten chapters set as a printed book. Contents page, running heads, folios, numbered plates, serif text at a long measure, page-turn transitions on the gutter axis. |
| `/line` | **Line** | Ten stations on a route, ordered chronologically — Taipei, then Berkeley, then San Francisco. A rigid tabular grid, split-flap headings, and a route line that draws with scroll. |

`/` serves Reel, which is the strongest of the three after design review.

## Running it

Node 22 is required (pinned via Volta in `package.json`).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide, React Router.
No backend.

## Content

Every fact, number, quote and link lives in `src/data/content.ts` and is taken
from Andrew's public Notion page. Nothing is invented. All three versions render
from that one file, so a correction in one place fixes all three.

Two light clarity edits were made to the source wording, with meaning and
numbers unchanged: `smtn` expanded to `something`, and `book` corrected to
`books`.

Three downloaded images were deliberately not shipped — a Letterboxd poster
grid, a Goodreads cover grid, and a pencil study of a Disney character — because
they are third-party artwork rather than Andrew's own photography. Those
interests are carried by type and by links to the live profiles instead.

## Info Diet

The Info Diet section renders the categories and items visible on the public
Notion page, plus a link to the live Notion database.

`scripts/sync-info-diet.mjs` is an **optional** build-time adapter for the
official Notion API. It is not part of `npm run build` and has not been
configured or run for this deployment, so **the site is not live-synced with
Notion**. If you want to use it:

```bash
export NOTION_TOKEN=...            # never commit this
export NOTION_INFO_DIET_DB_ID=...
npm run sync:info-diet
```

It writes `src/data/info-diet.generated.json`, which is gitignored. If that file
is missing, the static list is used, so production cannot break.

## Design

The visual direction was derived from a random seed string rather than from
default model preferences, then taken through a critic loop. The full record —
the seed, the measured subpatterns, the fifteen concept directions explored, and
the three implementation briefs — is in [`DESIGN-NOTES.md`](./DESIGN-NOTES.md).

## Accessibility

- Semantic landmarks and headings throughout; a skip link on every version.
- Visible high-contrast focus rings.
- Alt text describes what is actually visible in each photograph.
- `prefers-reduced-motion` is fully honoured: scroll-linked parallax, the route
  drawing, the split-flap headings and the page turns all resolve to static
  layout rather than merely running faster.

## Deploying

Static. Build with `npm run build` and serve `dist/`. `vercel.json` provides the
SPA rewrite so `/volume` and `/line` resolve on a hard refresh, plus long cache
headers for hashed assets and images.

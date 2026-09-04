# Design notes

Process followed: Discover → Define → Deliver, per Anshu Chimala's method
(Lenny's Newsletter, "How to turn your AI into a world-class designer").

## 1. Discover — String Seed of Thought

A 96-character random alphanumeric string was generated with a shell command
(`tr -dc 'a-z0-9' < /dev/urandom | head -c 96`) and used purely as a source of
non-average design decisions. The string itself is deliberately not surfaced in
the UI. What follows is what was actually derived from it.

Measured subpatterns:

| Pattern | Value | Design consequence |
| --- | --- | --- |
| Hue windows (8-char sums mod 360) | 130, 127, 131, 149, 107, 177, 121, 139, 167, 140, 179, 135 | Every window lands in **107–179: yellow-green → jade → cyan**. Never purple, never blue-violet. This became the entire ground palette. |
| Repeated runs | only `vv` and `bb` | Motion is **sparse and paired** — two-beat gestures, never continuous ambient animation. |
| Palindromes | `414`, `bvb` | A **mirrored 4-1-4 layout**: two content fields either side of a narrow central spine. |
| Letters : digits | 73 : 23 = **3.174** | Type scale ratio between body and display: 18px × 3.174 ≈ 57px display. |
| Digit-gap sequence | 3,3,2,3,7,1,1,7,2,1,5,1,2,6,9,9,1,11,2,11,3,2,3 | **Irregular vertical rhythm.** Section spacing is not a uniform grid. |
| Length / window count | 96 chars → 12 windows | **12 chapters.** |
| Digit sum | 78 | Body line-height 1.78 on long-form passages. |

The warm counterpoint (amber/ember) is not from the seed — it is sampled from
Andrew's own photographs: the sunrise on the paddleboard, and the gold-and-
magenta light tunnel.

### The organizing structure

`414` produced the initial structural idea. The final lenses use it differently
so each version has its own composition:

- Reel: a chronological documentary cut with editorial plates
- Volume: the gutter of an open book, with margin annotations
- Line: a rail line drawn along a route

Three structures and three grammars make the versions complete interpretations
rather than recolors.

## 2. Go broad — concept directions explored

Fifteen directions were generated before narrowing. Deliberately including ones
that sounded like they would not work.

1. **Contact sheet / darkroom** — sections as frames on a photographic contact
   sheet, grease-pencil crop marks, scrolling winds the film.
2. **The spine (book gutter)** — a hairline rule down the centre, content
   alternating recto/verso.
3. **Rail timetable** — a Taiwan Railway departure board; sections are stations;
   split-flap headings.
4. **Field notes** — monospaced ink-on-paper journal, no imagery until it
   arrives full-bleed and unannounced.
5. **Night market stall map** — isometric night market, each stall a section.
   *Rejected: cartoony, tacky.*
6. **Horizon line** — one fixed horizon the whole page passes through.
7. **Letterpress broadsheet** — bilingual newspaper columns, hairline rules,
   zero cards.
8. **Sprocket cinema** — 2.39:1 letterboxed scenes, hard cuts, slates, timecode.
9. **Mirror / reflection** — everything above the fold reflected below.
   *Rejected: unreadable at length.*
10. **Index card archive** — a card-catalogue drawer pulled open by scroll.
11. **Topographic contour** — Taiwan contour lines; elevation as scroll progress.
12. **Museum wall label** — full-bleed images with small gallery labels; extreme
    restraint.
13. **Marginalia** — a book someone has already read: underlines, dog-ears,
    annotations arriving as you scroll.
14. **Sonar / echo** — pings and echoes from the `vv`/`bb` doubled beats.
    *Rejected: too abstract for a personal site.*
15. **Passport stamps** — travel as a stamped page.

Explicitly avoided throughout: purple gradients, centred hero over a three-card
feature grid, ornamental blobs, glass-morphism, glows, oversized border radii,
and icon-in-a-rounded-square feature lists.

## 3. Define — the three briefs

Each is a complete interpretation. Same truthful content, different composition,
typography, transition grammar and interaction model.

### Reel — `/reel`
Andrew has logged 650+ films. The site is cut like one.
- **Composition** Full-bleed documentary scenes alternate with strict editorial
  plates. The story moves from Taipei to Berkeley to San Francisco.
- **Type** Archivo carries names and project plates. Spectral carries Andrew's
  first-person voice. Small labels use Archivo, not a third type family.
- **Color** Sky blue and deep ocean come from the opening photograph. Past
  documentary images are monochrome; present-day scenes and product work use color.
- **Transition grammar** Hard color cuts and controlled image parallax create
  the chapter changes without literal film decoration.
- **Interaction** Chapter links, external references, and expandable credits
  keep the full source material discoverable.

### Volume — `/volume`
Andrew has 295 books on Goodreads and reads across nine subject areas.
- **Composition** A book spread. Content sits recto/verso either side of the
  gutter. Generous outer margins hold annotations.
- **Type** Serif text face at a long measure, drop caps, old-style figures,
  footnote superscripts. Body line-height 1.78.
- **Transition grammar** Page turns — content rotates on the gutter axis with
  perspective. Underlines draw themselves left-to-right.
- **Interaction** Marginalia appear alongside as you read. A running folio.

### Line — `/line`
Taipei → Berkeley → San Francisco, plus hitchhiking, 111 miles on the east coast
of Taiwan, Mt Fuji, Sun Moon Lake.
- **Composition** A route line drawn down the spine. Stations sit on it,
  alternating left and right.
- **Type** Transit-signage sans, wide tracking on station names, a mono for
  coordinates and distances.
- **Transition grammar** The route path draws with scroll. Station markers
  arrive on a two-beat. Split-flap headings.
- **Interaction** Elevation and chapter progress track the route.

## 4. Deliver — restraint

Removed on the final pass: decorative section dividers, redundant scroll cues,
a second nav, hover glows, all card shadows, and every duplicated stat. Three
downloaded images were also dropped on principle rather than for design reasons —
a Letterboxd poster grid, a Goodreads cover grid, and a pencil study of a Disney
character — because they are third-party artwork rather than Andrew's own
photography. Those interests are carried by type and by links to the live
profiles instead.

Reduced motion is fully honoured: every scroll-linked transform, the timecode,
the path drawing and the page turns degrade to static, legible layout.

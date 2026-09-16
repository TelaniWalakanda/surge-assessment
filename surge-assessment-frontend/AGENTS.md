<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Breakpoints and Tailwind

- `globals.css` overrides `--breakpoint-md: 64rem`, so `md:` means 1024px site-wide
  (this collides with Tailwind's default `lg`, which is also 1024px).
- Do not use arbitrary-value utilities for heights/margins (`h-[180vh]`,
  `-mt-[100vh]`): the dev server's class scan does not reliably emit them. Put them
  in `globals.css` as a plain class instead, or use an inline `style`.

## Scroll transitions (`SteppedWipeSection`, `BarsWipeSection`)

Both use the same shell: a 180vh track whose first child is a 100vh `sticky`,
`overflow: hidden` camera. The camera stays pinned for the track's remaining
80vh, which is exactly the window ScrollTrigger scrubs (`start: "top top"` →
`end: "bottom bottom"`). When the scrub ends the camera unpins and slides away
together with the next section, so the transitioned frame hands over with no gap.

- Both are `display: none` below 1024px, and are removed entirely (including
their scroll length) under `prefers-reduced-motion: reduce`.
- Scrub is `1` (1s catch-up) in both.

Mount order in `src/app/page.tsx` matters:

1. `<SteppedWipeSection />` — directly after `<Hero />` and *outside* the
   `relative z-10` wrapper, because it has to paint over the hero.
2. `<BarsWipeSection />` — *inside* the `relative z-10` wrapper, between
   `<Specifications />` and `<Audience />`, because that wrapper is a stacking
   context and only a later positioned sibling paints over the specs section.

### SteppedWipeSection — hero → specs (white)

- Track `height: 180vh; margin-top: -100vh`.
- Six white panels, `grid-template-columns: repeat(6, 1fr)`, `align-items: end`,
  `border-right: 1px solid rgba(0, 0, 0, 0.2)`; black backdrop `inset: 0`.
- Panel *i* (left → right) rises `translateY(100% → 0)`, `power1.inOut`, over
  window `i × 0.1 → i × 0.1 + 0.5` of the scrub.
- Backdrop opacity `0 → 0.75` from `0.25 → 1`.
- The 10% stagger is what draws the staircase edge.

### BarsWipeSection — specs → who (black)

- Track `height: 180vh; margin-top: -70vh` (note: 70vh here, not 100vh).
- Four black bars in one centred column, `grid-template-rows: 1fr 2fr 2fr 2fr`,
  each starting at `width: 0%`.
- Bar *i* (top → bottom) grows `width: 0% → 100%`, `power1.out`, over windows
  `0.12–0.92`, `0.08–0.85`, `0.04–0.70`, `0.00–0.55` — the black climbs the frame
  bottom-up and the thin top band closes last.
- The last band ends at `0.92`, so the timeline is padded back to 1 with a dummy
  tween. Without that, the scrub maps onto 0.92 and every band runs ~8% early.

## GSAP notes

- Animations live in `gsap.context()` and are released with `ctx.revert()`;
  responsive behaviour uses `gsap.matchMedia()`.
- Never put a `transform`/`translate` in an inline `style`, or use a Tailwind
  `translate-*` class, on an element GSAP animates with `yPercent`/`xPercent` —
  the two apply on top of each other. Rely on `fromTo`'s immediate render inside
  `useLayoutEffect` for the pre-paint state instead.
- `scrub: 1` depends on the `requestAnimationFrame` ticker, which the VS Code
  integrated browser throttles when the page is not visible — the transitions
  look frozen there. Use `scrub: true` temporarily if you need to verify the
  mapping, and resize-less viewports are also unreliable in that browser.

## Content and data

- Every string and image comes from Strapi at runtime. No copy is hard-coded in
  the frontend.
- `src/lib/strapi.ts` — base URL from `NEXT_PUBLIC_STRAPI_URL` (default
  `http://localhost:1337`); requests are `revalidate: 60`.
- `src/lib/home-content.ts` — the `HomeContent` types the sections consume.
- `src/lib/home-mapper.ts` — maps the Strapi `home` / `header` / `footer`
  responses onto `HomeContent`.
- `HOME_POPULATE` in `src/app/page.tsx` lists every nested populate parameter.
  Strapi v5 does not expand nested components or media with a bare `populate=*`,
  and mixing `populate=*` with explicit `populate[...]` params silently drops the
  other component fields. `header` and `footer` are fetched with a `.catch()` so
  a missing public permission falls back to the defaults in the mapper.

## Page composition

Order in `src/app/page.tsx`: Header → Hero → SteppedWipe → Specifications →
BarsWipe → Audience → SectionIntro(paper) → SmartPaper → SectionIntro(box) →
InsideTheBox → Colors → Footer.

- `preloader.tsx` — counter 0 → 80% while assets load, 80 → 100% on the window
  `load` event, then fades (250ms delay, unmounts at 850ms). Its background
  repeats the hero's radial gradient so the reveal is seamless. It also forces
  the page back to the hero on every refresh: it sets
  `history.scrollRestoration = "manual"` and calls `window.scrollTo(0, 0)` (with
  `scroll-behavior` temporarily switched to `auto`) on mount, again on
  `pageshow`/`load` plus 200ms later, and once the counter completes — the
  browser's own scroll restoration runs after the first effect, so a single
  early reset does not stick. A reset is skipped when the URL carries a hash, so
  deep links still win.
- `hero-pen.tsx` — desktop only: a 270vh track with a sticky 100vh camera, and a
  scroll-scrubbed Lottie (`public/animations/hero_animation.json`, ~1.8MB, never
  loaded below 1024px) plus a slight camera push-in. Mobile shows the static
  `hero_mobile_bg_image` with the headline centred below it.
- `specifications.tsx` — 320vh track, sticky camera at `top-20`; three scroll
  phases (white staircase curtains, pen rising, spec cards). It toggles
  `data-header-hidden` between progress 0.04 and 0.96.
- `header.tsx` — fixed; samples the section behind its vertical centre (y = 40px)
  and inverts to black text over white sections. Hides while `#specifications`
  carries `data-header-hidden` (watched with a `MutationObserver`). Locks body
  scroll while the mobile menu is open; the mobile popup slides in from the top.
- `smart-paper.tsx` — desktop: a `${count * 100}vh` track with a sticky viewport
  and discrete one-slide-per-step stepping (`Math.round(progress * (count - 1))`).
  Mobile: horizontal `snap-x` carousel. Refs must be mounted in both branches
  because the scroll effect runs once with `[]` deps.
- `colors.tsx` — same discrete stepping as `smart-paper`, 400vh on desktop.
- `audience-media.tsx` — the client half of the audience section (the section
  itself stays a server component and just passes `video` / `image` down). The
  media box is right-aligned inside a `justify-end` wrapper and is capped at
  `max-h-[70vh]` with `object-cover`, so a wide clip is cropped rather than
  stretched. It has two scroll-linked phases, both measured from the wrapper's
  `getBoundingClientRect().top` (`vh` = viewport height). **Enter:** `scale 0.7 →
  1`, `ease: none`, as its top travels from `vh` (viewport bottom) to `0.3vh`.
  **Exit:** `scale 1 → 0.65`, `ease: none`, as its top continues from `0.3vh` to
  `-0.7vh`, i.e. it shrinks again on the way to the next section. The two are
  multiplied, which is safe because the exit term is 0 throughout the enter
  phase. Progress is recomputed on every `scroll` via `requestAnimationFrame`, so
  both phases run backwards when you scroll up.
  The reference also translates the video by `-17.5vh → 0` during its enter
  phase. That is deliberately **not** done here: the reference's video sits in a
  pinned 100vh camera inside a 180vh track, whereas ours is in normal flow with
  only the `mt-16` (64px) gap above it, so a `-17.5vh` offset pulls the media up
  over the audience text. Keep the box's layout position and animate only
  `scale`, or the media will overlap the copy above it.
  The scale values are the reference's own (its `SCALE` keyframes on
  `.who__video`). The `transform-origin` is switched per phase from JS: `100% 0%`
  while the media is still growing in, so it enters anchored to the right edge
  like the reference, and `50% 50%` once the exit phase starts, so it shrinks
  toward its own middle instead of drifting right. The switch is seamless
  because it only happens where the enter phase has finished, i.e. where the
  scale is exactly 1 and the transform is the identity, so the origin has no
  effect at that instant. Do not put an `origin-*` class on the box — the inline
  style would win and the phases would look the same. The reference's exit phase
  also fades to 0.2 opacity and slides `-16.63vw`, which is deliberately not
  implemented here.
  `prefers-reduced-motion: reduce` clears the transform entirely.
  The `max-height` has to sit on the `<video>` / `<img>` itself: a `max-height`
  on the wrapper `div` would not shrink the media, it would only let it overflow.
- `inside-the-box.tsx` — the smart-pen paragraph is revealed letter by letter as
  it crosses the viewport.
- `inside-the-box-media.tsx` — lays the CMS `media_files` out as a fixed bento
  composition (3 up, then one full width, then 2fr/1fr, then a 3-column grid).
- `section-intro.tsx` — standalone centred eyebrow + title with its own
  background, used for the `paperIntro` and `boxIntro` sections.

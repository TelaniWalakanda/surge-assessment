# Surge Global — Homepage Rebuild (Senior Web Developer Assignment)

Rebuild of the [reference site](https://nota.uprock.pro/) homepage, powered by a self-hosted
Strapi CMS and deployed on Railway.

- **Live site:** _add URL_
- **Strapi admin:** _add URL_

---

## Why Next.js

I chose Next.js because it's the framework I'm most familiar with and because it's the
strongest fit for a marketing/landing homepage like this one:

- **SEO** — server-side rendering / static generation means the page ships with fully
  rendered HTML and metadata for crawlers, rather than relying on client-side rendering.
- **Performance** — built-in image optimization, automatic code-splitting, and static
  generation keep the page fast, which matters directly for a one-page marketing site.
- **Familiarity** — being comfortable with the framework let me focus my time on matching
  the reference pixel-for-pixel and on the Strapi content modelling, rather than on
  learning tooling.

The project is set up as a **monorepo** (`frontend/` + `cms/` in a single repo). Since this
is a single-page site with a tightly coupled content model, keeping the Next.js app and the
Strapi instance in one repo made it much easier to keep the two in sync and to maintain
during the build, rather than splitting them into separate repos.

---

## Project structure

```
.
├── frontend/   # Next.js app
└── cms/        # Strapi (self-hosted) CMS
```

---

## Running locally

### 1. Clone the repo

```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Start the CMS (Strapi)

```bash
cd cms
npm install
```

Create a `.env` file inside `cms/`:

```dotenv
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified
```

> Replace every `tobemodified` value with your own generated secret before running this
> anywhere outside your local machine.

```bash
npm run develop
```

Strapi admin will be available at `http://localhost:1337/admin`.

### 3. Start the frontend (Next.js)

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```dotenv
# Strapi CMS base URL — set this to your deployed/local CMS URL.
# Example: NEXT_PUBLIC_STRAPI_URL=https://cms.example.com
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

---

## Content model (Strapi)

Everything shown on the homepage is editor-managed in Strapi — nothing is hardcoded in the
frontend.

- **Header** — single type. Manages navigation links, logo, and any header-level CTA.
- **Footer** — single type. Manages footer links, social links, and footer copy.
- **Home Page** — single type, built from a set of reusable 
- **components**, one per homepage section (hero, features, about, etc.), rather than one large rich text field.
  This keeps each section independently editable and keeps the editing experience close to
  what's actually on the page.
- **Repeatable components** — used wherever the reference site repeats an element (e.g.
  feature cards, about carousel, nav items, footer links), so editors can add, remove, or
  reorder items without touching code.
- **SVGs/icons** — uploaded and managed through the Strapi media library rather than
  bundled in the frontend, so icon changes don't require a redeploy.

This single-type + component structure was chosen specifically because the homepage is a
single, fixed-layout page: single types map naturally to "one page, several sections," while
components keep each section's fields organized and reusable instead of one long flat field
list.

---

## Key trade-offs

- **Scroll animations** — a few of the scroll-triggered animations on the reference site
  could not be fully replicated in the time available. The core layout, interactions, and
  responsiveness were prioritized over exactly matching every animation curve/timing.
- Content modelling favored **speed of editing** for a small, fixed set of homepage
  sections over building a more generic/flexible page-builder-style schema, since this is a
  one-page site and a fully dynamic zone-based builder wasn't necessary for the scope.

---

## What I'd improve with more time

- Refine and finish the remaining **scroll animations** to match the reference more closely.
- Polish additional **styling details** (spacing, transitions, micro-interactions) across
  breakpoints.

---

## AI tools used

- **GitHub Copilot (with DeepSeek as the model/agent in VS Code)** — used as my coding
  agent throughout the build for writing and iterating on frontend components and styling.
- **ChatGPT** — used specifically for guidance on Railway deployment steps (project/service
  setup, environment variables, networking between the frontend and CMS services).
- **Strapi content modelling and content entry** — done fully manually by me; no AI tool
  was used to design the content types/components or to populate the CMS data.

I'm able to explain and walk through any part of the codebase, the content model, or the
Railway setup on the call.

---

## Notes

- A `noindex` tag has been added to the site since the design belongs to the original
  creators (nota.uprock.pro).
- The site will remain live until the review round closes.
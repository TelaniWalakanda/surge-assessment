# NŌTA Frontend — Next Steps (CMS wiring)

This Next.js app currently renders the home page from static placeholder data in
`src/lib/home-content.ts`. The next step is to drive it from your Strapi CMS.

> Note: no images/videos are used anywhere yet — every visual is a
> `MediaPlaceholder` block in `src/components/media-placeholder.tsx`.

---

## 1. Create the Strapi content model for the home page

The existing CMS content types (`about`, `article`, `author`, `category`,
`global`) are blog-oriented. Create new ones for the home page.

### 1a. Components (`src/components/home/`)

Create these component schemas (copy the pattern from
`src/components/shared/*.json`):

**`home/hero.json`**

```json
{
  "collectionName": "components_home_heroes",
  "info": { "displayName": "Hero", "icon": "heading" },
  "options": {},
  "attributes": {
    "eyebrow": { "type": "string" },
    "headline": { "type": "string" },
    "productName": { "type": "string" },
    "price": { "type": "string" },
    "cta": { "type": "string" },
    "media": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images", "videos"]
    }
  }
}
```

**`home/spec-group.json`** — `title` (string), `items` (JSON, array of strings).

**`home/audience-card.json`** — `title` (string), `description` (text).

**`home/feature.json`** — `title` (string), `description` (text),
`media` (media, optional).

**`home/box-item.json`** — `title` (string), `description` (text),
`specs` (JSON, array of strings), `media` (media, optional).

**`home/color-option.json`** — `name` (string), `tagline` (string),
`color` (string, hex value for the swatch).

**`home/signup.json`** — `heading` (string), `description` (text),
`buttonLabel` (string).

### 1b. Single type `home` (`src/api/home/`)

Create `src/api/home/content-types/home/schema.json` with:

```json
{
  "kind": "singleType",
  "collectionName": "homes",
  "info": { "singularName": "home", "pluralName": "homes", "displayName": "Home" },
  "options": { "draftAndPublish": false },
  "pluginOptions": {},
  "attributes": {
    "hero": { "type": "component", "repeatable": false, "component": "home.hero" },
    "specifications": { "type": "component", "repeatable": true, "component": "home.spec-group" },
    "audienceHeading": { "type": "string" },
    "audienceIntro": { "type": "text" },
    "audience": { "type": "component", "repeatable": true, "component": "home.audience-card" },
    "aboutHeading": { "type": "string" },
    "aboutParagraphs": { "type": "json" },
    "smartPaperHeadingTop": { "type": "string" },
    "smartPaperHeadingBottom": { "type": "string" },
    "smartPaper": { "type": "component", "repeatable": true, "component": "home.feature" },
    "insideTheBoxHeading": { "type": "string" },
    "insideTheBoxIntro": { "type": "text" },
    "insideTheBox": { "type": "component", "repeatable": true, "component": "home.box-item" },
    "colorsHeading": { "type": "string" },
    "colors": { "type": "component", "repeatable": true, "component": "home.color-option" },
    "signup": { "type": "component", "repeatable": false, "component": "home.signup" },
    "seo": { "type": "component", "repeatable": false, "component": "shared.seo" }
  }
}
```

Also create `src/api/home/controllers/home.ts`, `routes/home.ts` and
`services/home.ts` (copy the structure from `src/api/about/`).

Restart the Strapi dev server, then fill in the content in the admin panel.

## 2. Allow public read access

In the Strapi admin: **Settings → Users & Permissions → Roles → Public**,
enable `find` for **Home**. This exposes `GET /api/home`.

## 3. Point the frontend at Strapi

```bash
cp .env.local.example .env.local   # then check NEXT_PUBLIC_STRAPI_URL
```

Strapi's default is `http://localhost:1337` (see `config/server.ts` in the CMS).

## 4. Add a fetch layer

Create `src/lib/strapi.ts`:

```ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function fetchAPI(path: string) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) throw new Error(`Strapi request failed: ${res.status}`);
  return res.json();
}

export function getStrapiMedia(url: string) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
```

## 5. Make `page.tsx` fetch and map data

Make `Home` an `async` server component, fetch
`/home?populate=deep`, and map the response into the existing
`HomeContent` shape (`src/lib/home-content.ts`), falling back to the static
data on error. Pass the mapped object to the same section components — no
component changes required.

## 6. Swap placeholders for real media (later)

1. In `next.config.ts`, allow Strapi as an image host:

```ts
images: {
  remotePatterns: [{ protocol: "http", hostname: "localhost", port: "1337" }],
}
```

2. Replace `MediaPlaceholder` usage with `next/image` (or `<video>`) using
`getStrapiMedia(media.url)`.

## 7. Wire the signup form

1. In Strapi, create a collection type `subscriber` with `email`
   (string, unique) and enable **Public → create**.
2. Convert `Signup` into a client component using a Server Action that
   `POST`s to `/api/subscribers`, or post directly from the client to Strapi.

## 8. SEO

Use the `home.seo` / `global.defaultSeo` fields via `generateMetadata()` in
`layout.tsx` or `page.tsx` instead of the hard-coded metadata.

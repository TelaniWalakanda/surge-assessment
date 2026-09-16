import { getStrapiMedia } from "@/lib/strapi";
import type {
  BoxItem,
  ColorOption,
  FeatureStory,
  HomeContent,
  MediaChip,
  MediaItem,
  NavLink,
  Specification,
} from "@/lib/home-content";

const str = (value: unknown): string =>
  typeof value === "string" && value.length > 0 ? value : "";

const optionalStr = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean);
  return [];
}

const mediaUrl = (m: unknown): string | null =>
  getStrapiMedia((m as { url?: string } | null | undefined)?.url ?? null);

const mediaList = (m: unknown): MediaItem[] => {
  const arr = Array.isArray(m) ? m : m ? [m] : [];
  const result: MediaItem[] = [];
  for (const x of arr) {
    const rec = (x ?? {}) as { url?: string; mime?: string };
    const url = mediaUrl(rec);
    if (url) result.push({ url, mime: rec.mime ?? null });
  }
  return result;
};

const DEFAULT_NAV: NavLink[] = [
  { label: "Specifications", href: "#specifications" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "About", href: "#about" },
  { label: "Inside the box", href: "#inside-the-box" },
];

const NAV_ANCHORS: Record<string, string> = {
  specifications: "#specifications",
  "who it's for": "#who-its-for",
  about: "#about",
  "inside the box": "#inside-the-box",
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toNavLinks = (value: unknown): NavLink[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((n) => {
      const label = str((n as AnyRecord)?.label).trim();
      const raw = str((n as AnyRecord)?.link).trim();
      const href =
        raw && raw !== "#"
          ? raw
          : NAV_ANCHORS[label.toLowerCase()] ?? `#${slugify(label)}`;
      return { label, href };
    })
    .filter((n) => n.label);
};

type AnyRecord = Record<string, unknown>;

export function mapHome(
  homeData: unknown,
  headerData?: unknown,
  footerData?: unknown,
): HomeContent {
  const d = (homeData ?? {}) as AnyRecord;
  const hero = (d.hero ?? {}) as AnyRecord;
  const specs = (d.specificationsSection ?? {}) as AnyRecord;
  const audience = (d.audienceSection ?? {}) as AnyRecord;
  const paperIntro = (d.paperIntro ?? {}) as AnyRecord;
  const boxIntro = (d.boxIntro ?? {}) as AnyRecord;
  const boxIntroSection = (d.inside_box_section ?? {}) as AnyRecord;
  const signup = (d.signup ?? {}) as AnyRecord;

  const h = (headerData ?? {}) as AnyRecord;
  const f = (footerData ?? {}) as AnyRecord;

  const hasHeader = headerData != null;
  const headerNav = toNavLinks(h.nav_link);
  const footerNav = toNavLinks(f.nav_link);

  return {
    header: {
      logo: mediaUrl(h.logo),
      nav: headerNav.length > 0 ? headerNav : DEFAULT_NAV,
      productName: hasHeader ? str(h.product_name) : str(hero.productName),
      productCardText: hasHeader
        ? str(h.product_card_text)
        : str(hero.productCardTitle),
      price: hasHeader ? str(h.price) : str(hero.price),
      ctaText: hasHeader ? str(h.cta_text) : str(hero.cta) || "Order",
      productCardLogo: mediaUrl(h.product_card_logo),
      mobileImage: mediaUrl(h.header_mobile_image),
    },
    hero: {
      eyebrow: str(hero.eyebrow),
      headline: str(hero.headline),
      productName: str(hero.productName),
      productCardTitle: str(hero.productCardTitle),
      price: str(hero.price),
      cta: str(hero.cta),
      mobileBgImage: mediaUrl(hero.hero_mobile_bg_image),
      mobileNavImage: mediaUrl(hero.hero_mobile_navigation_image),
    },
    specifications: {
      label: str(specs.specificationsLabel),
      heading: str(specs.specificationsHeading),
      groups: (Array.isArray(specs.specifications_group)
        ? specs.specifications_group
        : []
      )
        .map(
          (g: AnyRecord): Specification => ({
            title: str(g?.title),
            items: (Array.isArray(g?.specification_text)
              ? g.specification_text
              : []
            )
              .map((i: AnyRecord) => str(i?.specification))
              .filter(Boolean),
          }),
        )
        .filter((g: Specification) => g.title || g.items.length > 0),
      desktopImage: mediaUrl(specs.image_desktop),
      mobileImage: mediaUrl(specs.image_mobile),
    },
    audience: {
      introduction: str(audience.introductionText),
      eyebrow: str(audience.eyebrow),
      title: str(audience.title),
      description: str(audience.description),
      cards: (Array.isArray(audience.audiences) ? audience.audiences : []).map(
        (c: AnyRecord) => ({
          title: str(c?.title),
          description: str(c?.description),
        }),
      ),
      media: mediaList(audience.image),
    },
    smartPaper: {
      eyebrow: str(paperIntro.eyebrow),
      title: str(paperIntro.title),
      stories: (Array.isArray(d.featuresSection) ? d.featuresSection : []).map(
        (s: AnyRecord): FeatureStory => ({
          eyebrow: str(s?.eyebrow),
          title: str(s?.title),
          description: str(s?.description),
          image: mediaUrl(s?.image),
        }),
      ),
    },
    paperIntro: {
      eyebrow: str(paperIntro.eyebrow),
      title: str(paperIntro.title),
    },
    insideTheBox: {
      eyebrow: str(boxIntro.eyebrow),
      title: str(boxIntro.title),
      introTitle: str(boxIntroSection.title),
      introDescription: str(boxIntroSection.description),
      introMedia: mediaUrl(boxIntroSection.media),
      smartPenDescription: str(d.smart_pen_description),
      items: (Array.isArray(d.inside_box) ? d.inside_box : []).map(
        (b: AnyRecord): BoxItem => ({
          title: str(b?.title),
          description: str(b?.description),
          specs: asStringList(b?.specs),
          media: mediaUrl(b?.media),
        }),
      ),
      mediaFiles: (Array.isArray(d.media_files) ? d.media_files : []).map(
        (m: AnyRecord): MediaChip => ({
          chipText: optionalStr(m?.chip_text),
          media: mediaList(m?.media_file),
        }),
      ),
    },
    boxIntro: {
      eyebrow: str(boxIntro.eyebrow),
      title: str(boxIntro.title),
    },
    colors: {
      options: (Array.isArray(d.colors) ? d.colors : []).map(
        (c: AnyRecord): ColorOption => ({
          name: str(c?.name),
          tagline: str(c?.tagline),
          color: optionalStr(c?.color),
          image: mediaUrl(c?.image),
        }),
      ),
    },
    signup: {
      heading: str(signup.heading),
      description: str(signup.description),
      placeholder: str(signup.placeholder),
      button: str(signup.buttonLabel),
    },
    footer: {
      text:
        str(f.footer_text) ||
        "NŌTA creates tools that respect the way people think and write. Natural handwriting, quietly connected to digital structure.",
      navTitle: str(f.nav_title) || "Navigation",
      nav: footerNav.length > 0 ? footerNav : DEFAULT_NAV,
      year: str(f.Year) || "2026",
      footnote: str(f.footnote) || "@2026 Nōta Team",
    },
  };
}

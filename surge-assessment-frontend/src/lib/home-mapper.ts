import type { HomeContent } from "@/lib/home-content";

/**
 * Maps the Strapi `home` single-type REST response into the `HomeContent`
 * shape consumed by the section components. All values come from the CMS.
 */

const str = (value: unknown): string =>
  typeof value === "string" && value.length > 0 ? value : "";

const optionalStr = (value: unknown): string | undefined =>
  typeof value === "string" && value.length > 0 ? value : undefined;

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  return [];
}

type AnyRecord = Record<string, any>;

export function mapHome(data: unknown): HomeContent {
  const d = (data ?? {}) as AnyRecord;
  const hero = (d.hero ?? {}) as AnyRecord;
  const signup = (d.signup ?? {}) as AnyRecord;

  return {
    brand: "NŌTA",
    brandTagline: "Writing Infrastructure for Modern Thinking",
    nav: [
      { label: "Specifications", href: "#specifications" },
      { label: "Who it's for", href: "#who-its-for" },
      { label: "About", href: "#about" },
      { label: "Inside the box", href: "#inside-the-box" },
    ],
    hero: {
      eyebrow: str(hero.eyebrow),
      headline: str(hero.headline),
      productName: str(hero.productName),
      productCardTitle: str(hero.productCardTitle),
      price: str(hero.price),
      cta: str(hero.cta),
    },
    specifications: {
      label: str(d.specificationsLabel),
      heading: str(d.specificationsHeading),
      groups: (Array.isArray(d.specifications) ? d.specifications : []).map(
        (g: AnyRecord) => ({
          title: str(g?.title),
          items: asStringList(g?.items),
        }),
      ),
    },
    audience: {
      heading: str(d.audienceHeading),
      intro: str(d.audienceIntro),
      cards: (Array.isArray(d.audience) ? d.audience : []).map((c: AnyRecord) => ({
        title: str(c?.title),
        description: str(c?.description),
      })),
    },
    about: {
      heading: str(d.aboutHeading),
      paragraphs: asStringList(d.aboutParagraphs),
    },
    smartPaper: {
      headingTop: str(d.smartPaperHeadingTop),
      headingBottom: str(d.smartPaperHeadingBottom),
      features: (Array.isArray(d.smartPaper) ? d.smartPaper : []).map(
        (f: AnyRecord) => ({
          title: str(f?.title),
          description: str(f?.description),
        }),
      ),
    },
    insideTheBox: {
      heading: str(d.insideTheBoxHeading),
      subheading: "",
      intro: str(d.insideTheBoxIntro),
      items: (Array.isArray(d.insideTheBox) ? d.insideTheBox : []).map(
        (b: AnyRecord) => ({
          title: str(b?.title),
          description: str(b?.description),
          specs: asStringList(b?.specs),
        }),
      ),
    },
    colors: {
      heading: str(d.colorsHeading),
      options: (Array.isArray(d.colors) ? d.colors : []).map((c: AnyRecord) => ({
        name: str(c?.name),
        tagline: str(c?.tagline),
        color: optionalStr(c?.color),
      })),
    },
    signup: {
      heading: str(signup.heading),
      description: str(signup.description),
      placeholder: str(signup.placeholder),
      button: str(signup.buttonLabel),
    },
    footer: {
      navigationHeading: "Navigation",
      year: str(d.footerYear),
      copyright: str(d.footerCopyright),
      credits: asStringList(d.footerCredits),
    },
  };
}

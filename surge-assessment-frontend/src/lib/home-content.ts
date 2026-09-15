/**
 * Type definitions for the NŌTA home page content.
 *
 * All copy is fetched from the Strapi CMS at runtime — no static content is
 * stored in the frontend. See `src/lib/strapi.ts` and `src/lib/home-mapper.ts`.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type Specification = {
  title: string;
  items: string[];
};

export type AudienceCard = {
  title: string;
  description: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type BoxItem = {
  title: string;
  description: string;
  specs: string[];
};

export type ColorOption = {
  name: string;
  tagline: string;
  color?: string;
};

export type HomeContent = {
  brand: string;
  brandTagline: string;
  nav: NavLink[];
  hero: {
    eyebrow: string;
    headline: string;
    productName: string;
    price: string;
    cta: string;
    productCardTitle: string;
  };
  specifications: {
    label: string;
    heading: string;
    groups: Specification[];
  };
  audience: {
    heading: string;
    intro: string;
    cards: AudienceCard[];
  };
  about: {
    heading: string;
    paragraphs: string[];
  };
  smartPaper: {
    headingTop: string;
    headingBottom: string;
    features: Feature[];
  };
  insideTheBox: {
    heading: string;
    subheading: string;
    intro: string;
    items: BoxItem[];
  };
  colors: {
    heading: string;
    options: ColorOption[];
  };
  signup: {
    heading: string;
    description: string;
    placeholder: string;
    button: string;
  };
  footer: {
    navigationHeading: string;
    year: string;
    copyright: string;
    credits: string[];
  };
};

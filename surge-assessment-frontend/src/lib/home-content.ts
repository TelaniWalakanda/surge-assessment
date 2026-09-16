export type NavLink = {
  label: string;
  href: string;
};

export type MediaItem = {
  url: string;
  mime: string | null;
};

export type Specification = {
  title: string;
  items: string[];
};

export type AudienceCard = {
  title: string;
  description: string;
};

export type FeatureStory = {
  eyebrow: string;
  title: string;
  description: string;
  image: string | null;
};

export type BoxItem = {
  title: string;
  description: string;
  specs: string[];
  media: string | null;
};

export type MediaChip = {
  chipText: string | null;
  media: MediaItem[];
};

export type ColorOption = {
  name: string;
  tagline: string;
  color: string | null;
  image: string | null;
};

export type SectionIntroContent = {
  eyebrow: string;
  title: string;
};

export type HomeContent = {
  header: {
    logo: string | null;
    nav: NavLink[];
    productName: string;
    productCardText: string;
    price: string;
    ctaText: string;
    productCardLogo: string | null;
    mobileImage: string | null;
  };
  hero: {
    eyebrow: string;
    headline: string;
    productName: string;
    productCardTitle: string;
    price: string;
    cta: string;
    mobileBgImage: string | null;
    mobileNavImage: string | null;
  };
  specifications: {
    label: string;
    heading: string;
    groups: Specification[];
    desktopImage: string | null;
    mobileImage: string | null;
  };
  audience: {
    introduction: string;
    eyebrow: string;
    title: string;
    description: string;
    cards: AudienceCard[];
    media: MediaItem[];
  };
  smartPaper: {
    eyebrow: string;
    title: string;
    stories: FeatureStory[];
  };
  insideTheBox: {
    eyebrow: string;
    title: string;
    introTitle: string;
    introDescription: string;
    introMedia: string | null;
    smartPenDescription: string;
    items: BoxItem[];
    mediaFiles: MediaChip[];
  };
  paperIntro: SectionIntroContent;
  boxIntro: SectionIntroContent;
  colors: {
    options: ColorOption[];
  };
  signup: {
    heading: string;
    description: string;
    placeholder: string;
    button: string;
  };
  footer: {
    text: string;
    navTitle: string;
    nav: NavLink[];
    year: string;
    footnote: string;
  };
};

import type { Schema, Struct } from '@strapi/strapi';

export interface HomeAudienceCard extends Struct.ComponentSchema {
  collectionName: 'components_home_audience_cards';
  info: {
    description: "A single audience card in the Who it's for section";
    displayName: 'Audience Card';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeAudienceSection extends Struct.ComponentSchema {
  collectionName: 'components_home_audience_sections';
  info: {
    displayName: 'Audience Section';
  };
  attributes: {
    audiences: Schema.Attribute.Component<'home.audience-card', true>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    introductionText: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeBoxItem extends Struct.ComponentSchema {
  collectionName: 'components_home_box_items';
  info: {
    description: 'An item inside the box section';
    displayName: 'Box Items Section';
    icon: 'box';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    specs: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface HomeBoxSingleItem extends Struct.ComponentSchema {
  collectionName: 'components_home_box_single_items';
  info: {
    displayName: 'Box Single Item';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeColorOption extends Struct.ComponentSchema {
  collectionName: 'components_home_color_options';
  info: {
    description: 'A product color option with swatch color';
    displayName: 'Color Options Section';
    icon: 'paint-brush';
  };
  attributes: {
    color: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface HomeFeatureStoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_home_feature_stories_sections';
  info: {
    displayName: 'Feature Stories Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Home hero section';
    displayName: 'Hero Section';
    icon: 'heading';
  };
  attributes: {
    cta: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    hero_desktop_animation_json: Schema.Attribute.JSON;
    hero_mobile_bg_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    hero_mobile_navigation_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    price: Schema.Attribute.String;
    productCardTitle: Schema.Attribute.String;
    productName: Schema.Attribute.String;
  };
}

export interface HomeIntroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_intro_sections';
  info: {
    displayName: 'Intro Section';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeMediaSectionItem extends Struct.ComponentSchema {
  collectionName: 'components_home_media_section_items';
  info: {
    displayName: 'Media Section Item';
  };
  attributes: {
    chip_text: Schema.Attribute.String;
    media_file: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface HomeSignup extends Struct.ComponentSchema {
  collectionName: 'components_home_signups';
  info: {
    description: 'Email signup / early access section';
    displayName: 'Signup';
    icon: 'envelope';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
  };
}

export interface HomeSpecGroup extends Struct.ComponentSchema {
  collectionName: 'components_home_spec_groups';
  info: {
    description: 'A specification column with a title and bullet items';
    displayName: 'Specification Group';
    icon: 'list';
  };
  attributes: {
    specification_text: Schema.Attribute.Component<
      'home.specification-item',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomeSpecificationItem extends Struct.ComponentSchema {
  collectionName: 'components_home_specification_items';
  info: {
    displayName: 'Specification Item';
  };
  attributes: {
    specification: Schema.Attribute.String;
  };
}

export interface HomeSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_home_specifications';
  info: {
    displayName: 'Specifications Section';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    specifications_group: Schema.Attribute.Component<'home.spec-group', true>;
    specificationsHeading: Schema.Attribute.String;
    specificationsLabel: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedNavLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    displayName: 'Nav Links';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'home.audience-card': HomeAudienceCard;
      'home.audience-section': HomeAudienceSection;
      'home.box-item': HomeBoxItem;
      'home.box-single-item': HomeBoxSingleItem;
      'home.color-option': HomeColorOption;
      'home.feature-stories-section': HomeFeatureStoriesSection;
      'home.hero': HomeHero;
      'home.intro-section': HomeIntroSection;
      'home.media-section-item': HomeMediaSectionItem;
      'home.signup': HomeSignup;
      'home.spec-group': HomeSpecGroup;
      'home.specification-item': HomeSpecificationItem;
      'home.specifications': HomeSpecifications;
      'shared.media': SharedMedia;
      'shared.nav-links': SharedNavLinks;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}

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

export interface HomeBoxItem extends Struct.ComponentSchema {
  collectionName: 'components_home_box_items';
  info: {
    description: 'An item inside the box section';
    displayName: 'Box Item';
    icon: 'box';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    specs: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface HomeColorOption extends Struct.ComponentSchema {
  collectionName: 'components_home_color_options';
  info: {
    description: 'A product color option with swatch color';
    displayName: 'Color Option';
    icon: 'paint-brush';
  };
  attributes: {
    color: Schema.Attribute.String;
    name: Schema.Attribute.String;
    tagline: Schema.Attribute.String;
  };
}

export interface HomeFeature extends Struct.ComponentSchema {
  collectionName: 'components_home_features';
  info: {
    description: 'A feature block for the smart paper section';
    displayName: 'Feature';
    icon: 'cube';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Home hero section';
    displayName: 'Hero';
    icon: 'heading';
  };
  attributes: {
    cta: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    price: Schema.Attribute.String;
    productCardTitle: Schema.Attribute.String;
    productName: Schema.Attribute.String;
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
    displayName: 'Spec Group';
    icon: 'list';
  };
  attributes: {
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
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
      'home.box-item': HomeBoxItem;
      'home.color-option': HomeColorOption;
      'home.feature': HomeFeature;
      'home.hero': HomeHero;
      'home.signup': HomeSignup;
      'home.spec-group': HomeSpecGroup;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}

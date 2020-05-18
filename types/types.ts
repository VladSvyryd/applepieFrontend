import { ReactNode } from "react";

export enum Language {
  en,
  de,
}
export const locales = [Language.en, Language.de] as const;

export const defaultLocale = Language.de;

export type LayoutProps = {
  navigation: NavType;
  children: ReactNode;
  horizontalFooter?: boolean;
  verticalFooter?: boolean;
};
export type NavProps = {
  navigation: NavType;
};
export type CarouselProps = {
  children: ReactNode;
};

export type HomeProps = {
  pageFromCMS: HomePage;
  navigation: NavType;
};

export type NavType = {
  title?: string;
  logo?: Logo;
  links_de?: [NavLink];
  links_en?: [NavLink];
};

export interface NavLink {
  name: string;
  url: string;
}
export interface Logo {
  name: string;
  url: string;
}

export type HomePage = {
  intro: Intro;
  social_links: Link[];
  services: Link[];
  known_by: Link[];
  navigation_links: Link[];
};

export interface Intro {
  picture: Picture[];
  title: string;
  description: string;
  logo: Picture;
  buttons: Button[];
}
export interface Button {
  name: string;
  function: string;
}
export interface NavigationLinkBlock {
  pages: Link;
}
export interface Link {
  name: string;
  url: string;
  img?: Picture;
}

export interface Picture {
  name: string;
  alternativeText: string;
  caption: string;
  ext: string;
  width: number;
  height: number;
  url: string;
  formats?: PictureFormats;
}
export interface PictureFormats {
  thumbnail: PictureFormat;
  small: PictureFormat;
}

export interface PictureFormat {
  ext: string;
  width: number;
  height: number;
  url: string;
}

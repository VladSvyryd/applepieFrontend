import { ReactNode, ReactNodeArray } from "react";
import { Service } from "../components/FormSlider/FormSlider";

export enum Language {
  en,
  de,
}
export enum ButtonType {
  LINK = "LINK",
  BUTTON = "BUTTON",
}
export const locales = [Language.en, Language.de] as const;

export const defaultLocale = Language.de;

export type LayoutProps = {
  navigation: NavType;
  children: ReactNode;
  horizontalFooter?: boolean;
  verticalFooter?: boolean;
  simple_header?: boolean;
  footer?: Footer;
  legal?: Button[];
};

export type Footer = {
  navigation_links: Link[];
  known_by: Link[];
  social_links: Link[];
};

export type NavProps = {
  navigation: NavType;
  activeCarouselIndex: number;
  invertedSlides: number[];
  social_links?: Link[];
  legal?: Button[];
};
export type CarouselProps = {
  children: ReactNodeArray;
  paginationObject: {
    pagination: Pagination;
  };
  isMobile: boolean;
};

export type HomeProps = {
  pageFromCMS: HomePage;
  navigation: NavType;
  isMobile: boolean;
  footer?: Footer;
  services: Service[];
  legal: Button[];
};
export type AboutProps = {
  pageFromCMS: HomePage;
  navigation: NavType;
};
export type ReviewProps = {
  review: Review;
  index?: number;
  count: number;
};
export type Review = {
  name?: string;
  position?: string;
  content_text?: string;
  createdAt?: string;
  avatar?: Picture;
  id?: string;
};
export type SendFormProps = {
  button: Button;
};
export type NavType = {
  title?: string;
  logo?: Picture;
  links?: Button[];
  logo_inverted?: Picture;
  plane?: Picture;
  plane_inverted?: Picture;
};

export interface NavLink {
  name: string;
  url: string;
  image: Picture;
}

export type HomePage = {
  intro: Intro;
  first_section: Idea;
  second_section: Idea;
  third_section: Image_Grid;
  forth_section: Idea_Image_Grid;
  fifth_section: Idea;
  sixth_section: Idea;
  seventh_section: Idea;
  eighth_section: Idea;
  pagination: Pagination;
  contact: Address;
  buttons: Button[];
  reviews: Review[];
};
export enum DEVICE {
  MOBILE,
  TABLET,
  DESKTOP,
}
export type ReviewCarouselProps = {
  reviews: Review[];
  img: Picture;
  buttonImg: Picture;
};
export interface Idea_Image_Grid {
  title: string;
  images: Picture[];
  content_text: string;
  cards: Card[];
  button: Button;
}
export interface Card {
  title: string;
  image: Picture;
  subtitle: string;
}
export interface Address {
  title: string;
  street: string;
  city: string;
  t_number: string;
  content: string;
  time_from: string;
  time_till: string;
  day: string;
  lat: number;
  lng: number;
}
export interface Image_Grid {
  title: string;
  images: Picture[];
}
export interface Idea {
  images: Picture[];
  title: string;
  content_text: string;
  button: Button;
}
export interface Intro {
  pictures?: Picture[];
  title: string;
  description: string;
  logo: Picture;
}

export interface Pagination {
  title?: string;
  background: Picture[];
  background_alternative: Picture[];
  icons: Image[];
}
export interface Image {
  name: string;
  alternative_name?: string;
  alternative_text: string;
  alternative_text_alternative?: string;
  image: Picture;
  image_alternative: Picture;
}

export enum LinkType {
  internal = "internal",
  external = "external",
}
export enum ButtonFunction {
  slider = "slider",
  start_project = "start_project",
}
export interface Button {
  text: string;
  function: string;
  subtext: string;
  type: ButtonType;
  link_type: LinkType;
  slideTo: number;
  button_type: ButtonFunction;
}
export interface NavigationLinkBlock {
  pages: Link;
}
export interface Link {
  name: string;
  url: string;
  image?: Picture;
  image_alternative?: Picture;
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

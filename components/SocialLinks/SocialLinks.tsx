import { Link } from "../../types/types";
import { FC } from "react";
import link from "./socialLinks.module.scss";
import { useStoreState } from "easy-peasy";
import { motion } from "framer-motion";

type SocialLinksProps = {
  links: Link[];
  invertedSlides?: number[];
};
export const SocialLinks: FC<SocialLinksProps> = ({
  links,
  invertedSlides,
}) => {
  const activeCarouselIndex = useStoreState(
    (state) => state.swiper.activeIndex
  );
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };
  const variantsOfLink = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  return (
    <motion.div variants={variants} className={link.container}>
      {links?.map((value: Link) => (
        <motion.a
          href="https://www.instagram.com/?hl=de"
          className={link.linkWithBorder}
          variants={variantsOfLink}
          key={value.name}
        >
          <img
            src={`${
              invertedSlides
                ? invertedSlides.some((e) => e === activeCarouselIndex)
                  ? value?.image_alternative?.url
                  : value?.image?.url
                : value?.image_alternative?.url
            }`}
            alt={value?.image?.alternativeText}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

import { FC, ReactNode } from "react";
import { ButtonType, LinkType, ButtonFunction } from "../../types/types";
import { motion } from "framer-motion";
import SwiperCore from "swiper";
import Link from "next/link";
import { useStoreActions } from "../../hooks";

export type ButtonOrLinkProps = {
  buttonType: ButtonType;
  linkType?: LinkType;
  swiperSlideTo?: number;
  title: string | ReactNode;
  functionOrUrl?: string;
  customOnClick?: any;
  swiper?: SwiperCore | undefined;
  linkLanguage?: string;
  button_type?: ButtonFunction;
  className?: string;
  [x: string]: any;
  type?: any;
};
const ButtonOrLink: FC<ButtonOrLinkProps> = ({
  buttonType,
  customOnClick,
  title,
  functionOrUrl,
  linkType,
  swiper,
  swiperSlideTo,
  linkLanguage,
  button_type,
  className,
  type,
}) => {
  const setInterFormState = useStoreActions(
    (actions) => actions.device.setInterFormState
  );
  const handleButtonClick = () => {
    switch (button_type) {
      case ButtonFunction.slider:
        swiper?.slideTo(swiperSlideTo || 0);
        break;
      case ButtonFunction.start_project:
        setInterFormState(true);
        break;
      default:
        swiper?.slideTo(0);
        break;
    }
  };
  if (buttonType === ButtonType.BUTTON) {
    return (
      <motion.button
        className={` ${className}`}
        data-swiper-parallax="1100"
        data-swiper-parallax-opacity="0"
        // whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        onClick={customOnClick || handleButtonClick}
        type={type}
      >
        {title}
      </motion.button>
    );
  }
  return linkType === LinkType.internal ? (
    <Link
      href={`/${linkLanguage}/${functionOrUrl}`}
      as={`/${linkLanguage}/${functionOrUrl}`}
    >
      <motion.a
        className={`${className}`}
        data-swiper-parallax="1100"
        data-swiper-parallax-opacity="0"
        whileTap={{ scale: 0.9 }}
      >
        {title}
      </motion.a>
    </Link>
  ) : (
    <Link prefetch={false} href={functionOrUrl || ""} passHref>
      <motion.a
        className={`${className}`}
        data-swiper-parallax="1100"
        data-swiper-parallax-opacity="0"
        whileTap={{ scale: 0.9 }}
        target="_blank"
        href={functionOrUrl}
      >
        {title}
      </motion.a>
    </Link>
  );
};

export default ButtonOrLink;

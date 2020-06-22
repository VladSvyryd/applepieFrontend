import { useState, useEffect, FC, useRef } from "react";
import { motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./NavigationList";
import { useStoreState } from "easy-peasy";
import nav from "./nav.module.scss";
import { NavLink, Link } from "../../types/types";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { useOnClickOutside, useStoreActions } from "../../hooks";
type MobileNavigationProps = {
  links: NavLink[];
  social_links: Link[];
};
export const MobileNavigation: FC<MobileNavigationProps> = ({
  links,
  social_links,
}) => {
  const width = useStoreState((state) => state.device.width);
  const height = useStoreState((state) => state.device.height);
  const invertedSlidesArray = useStoreState(
    (state) => state.swiper.invertedSlides
  );
  const activeIndex = useStoreState((state) => state.swiper.activeIndex);
  const [inverted, setInverted] = useState(false);
  const menuOpened = useStoreState((state) => state.device.menuOpened);
  const tOpen = useStoreActions((actions) => actions.device.setMenuState);
  const [currentWindow, setCurrentWindow] = useState({
    width: width,
    height: height,
  });
  const onClick = () => {
    tOpen(!menuOpened);
  };

  const sidebar = {
    open: (custom: { width: number; height: number }) => ({
      clipPath: `circle(${custom.height + 700}px at calc(100% - 52px) 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: (_custom: { width: number; height: number }) => ({
      clipPath: `circle(0px at calc(100% - 52px)  35px)`,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }),
  };
  // const mobileMenuRef = useRef<HTMLElement>(null);
  // useOnClickOutside(mobileMenuRef, () => menuOpened && tOpen(false));
  useEffect(() => {
    setCurrentWindow({ width: width, height: height });
  }, [width, height]);
  useEffect(() => {
    invertedSlidesArray.some((s: number) => s === activeIndex)
      ? setInverted(true)
      : setInverted(false);
  }, [activeIndex]);
  const reveal = {
    open: { display: "flex" },
    closed: { display: "none", transition: { when: "afterChildren" } },
  };
  const prevDef = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      <motion.nav
        className={nav.nav + " " + nav.onMobile}
        initial={false}
        animate={menuOpened ? "open" : "closed"}
        variants={reveal}
        onClick={() => onClick()}
        // ref={mobileMenuRef}
      >
        <motion.div
          variants={sidebar}
          className={nav.background}
          style={inverted ? { background: "white" } : {}}
          custom={currentWindow}
          onClick={(e) => prevDef(e)}
        >
          <Navigation
            links={links}
            inverted={inverted}
            toggleMenu={() => onClick()}
          />
          <SocialLinks links={social_links} inverted={inverted} />
        </motion.div>
      </motion.nav>
      <MenuToggle
        toggle={() => onClick()}
        isOpen={menuOpened}
        inverted={inverted}
      />
    </>
  );
};

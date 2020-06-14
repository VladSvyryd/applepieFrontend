import { useRef, useState, useEffect, FC } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./NavigationList";
import { useStoreState } from "easy-peasy";
import nav from "./nav.module.scss";
import { NavLink, Link } from "../../types/types";
import { SocialLinks } from "../SocialLinks/SocialLinks";
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
  const [currentWindow, setCurrentWindow] = useState({
    width: width,
    height: height,
  });
  const [isOpen, toggleOpen] = useCycle(false, true);
  const onClick = () => {
    !isOpen ? openMenu() : closeMenu();
  };
  const openMenu = () => {
    toggleOpen();
  };
  const closeMenu = () => {
    toggleOpen();
    console.log("closeTrigered");
  };
  const node = useRef<HTMLElement>(null);
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
      clipPath: `circle(0px at calc(100% - 52px)  40px)`,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }),
  };
  useEffect(() => {
    setCurrentWindow({ width: width, height: height });
    console.log({ currentWindow });
  }, [width, height]);
  const reveal = {
    open: { display: "flex" },
    closed: { display: "none", transition: { when: "afterChildren" } },
  };
  return (
    <>
      <motion.nav
        className={nav.nav + " " + nav.onMobile}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={reveal}
        ref={node}
      >
        <motion.div
          variants={sidebar}
          className={nav.background}
          custom={currentWindow}
        />
        <Navigation links={links} />
        <SocialLinks links={social_links} />
      </motion.nav>
      <MenuToggle toggle={() => onClick()} isOpen={isOpen} />
    </>
  );
};

import { useState, useEffect, FC } from "react";
import { motion } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { List } from "./List";
import { useStoreState } from "easy-peasy";
import nav from "./nav.module.scss";
import { Button } from "../../types/types";
import { useStoreActions } from "../../hooks";
type MobileNavigationProps = {
  links: Button[];
};

export const LegalNavigation: FC<MobileNavigationProps> = ({ links }) => {
  const width = useStoreState((state) => state.device.width);
  const height = useStoreState((state) => state.device.height);
  const invertedSlidesArray = useStoreState(
    (state) => state.swiper.invertedSlides
  );
  const activeIndex = useStoreState((state) => state.swiper.activeIndex);
  const [inverted, setInverted] = useState(false);
  const menuOpened = useStoreState((state) => state.device.legalOpened);
  const tOpen = useStoreActions((actions) => actions.device.setLegalOpened);

  const onClick = () => {
    tOpen(!menuOpened);
  };
  const defineRadiusOfCircle = () => {
    if (width >= 1024) return height + width / 2;
    else {
      return height + width / 4;
    }
  };
  const sidebar = {
    open: (_custom: { width: number; height: number }) => ({
      clipPath: `circle(${defineRadiusOfCircle()}px at calc(100% - 52px) 40px)`,
      transition: {
        type: "spring",
        stiffness: 30,
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
          onClick={(e) => prevDef(e)}
        >
          <List
            links={links}
            inverted={inverted}
            toggleMenu={() => onClick()}
          />
        </motion.div>
      </motion.nav>
      {menuOpened && (
        <MenuToggle
          className={nav.button + " " + nav.onMobile}
          toggle={() => onClick()}
          isOpen={menuOpened}
          inverted={inverted}
        />
      )}
    </>
  );
};

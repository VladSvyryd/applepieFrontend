import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import nav from "./nav.module.scss";
import { Button, Language, ButtonType, LinkType } from "../../types/types";
import { FC } from "react";
import Link from "next/link";
import { useStoreState } from "easy-peasy";
import { useStoreActions } from "../../hooks";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
type NavigationProps = {
  links: Button[];
  inverted: boolean;
  toggleMenu: any;
};

export const Navigation: FC<NavigationProps> = ({
  links,
  inverted,
  toggleMenu,
}) => {
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const setInterFormState = useStoreActions(
    (actions) => actions.device.setInterFormState
  );
  const handleClickOnButton = () => {
    toggleMenu();
    setInterFormState(true);
  };
  const renderMenuItem = (link: Button) => {
    if (link.type === ButtonType.BUTTON) {
      return (
        <span
          className={`${nav.navLink}`}
          style={inverted ? { color: "#403d55" } : { color: "#fff" }}
          onClick={handleClickOnButton}
        >
          {link.text}
        </span>
      );
    }
    return link.link_type === LinkType.internal ? (
      <Link
        key={link.function + "nav1"}
        href={`/${Language[currentLanguage]}${link.function}`}
        as={`/${Language[currentLanguage]}${link.function}`}
      >
        <a
          className={`${nav.navLink} ${inverted && nav.inverted}`}
          onClick={toggleMenu}
        >
          {link.text}
        </a>
      </Link>
    ) : (
      <Link
        key={link.function + "nav2"}
        href={`/${Language[currentLanguage]}${link.function}`}
        passHref
      >
        <a
          target="_blank"
          href={`/${Language[currentLanguage]}${link.function}`}
          className={`${nav.navLink}`}
          style={inverted ? { color: "#403d55" } : {}}
          onClick={toggleMenu}
        >
          {link.text}
        </a>
      </Link>
    );
  };
  return (
    <motion.ul variants={variants} className={nav.ul}>
      {links?.map((l: Button, i: number) => (
        <MenuItem index={i} key={"menu-item" + i}>
          {renderMenuItem(l)}
        </MenuItem>
      ))}
    </motion.ul>
  );
};

// const itemIds: number[] = [0, 1, 2, 3, 4];

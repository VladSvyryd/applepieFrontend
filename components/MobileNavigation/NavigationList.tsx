import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import nav from "./nav.module.scss";
import { Button, Language } from "../../types/types";
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
  return (
    <motion.ul variants={variants} className={nav.ul}>
      {links?.map((l: Button, i: number) => (
        <MenuItem index={i} key={i}>
          {l.type === "LINK" ? (
            <Link
              key={l.function + "nav"}
              href={`/[lang]${l.function}`}
              as={`/${Language[currentLanguage]}${l.function}`}
            >
              <a
                className={`${nav.navLink}`}
                style={inverted ? { color: "#403d55" } : {}}
                onClick={toggleMenu}
              >
                {l.text}
              </a>
            </Link>
          ) : (
            <span
              className={`${nav.navLink}`}
              style={inverted ? { color: "#403d55" } : { color: "#fff" }}
              onClick={handleClickOnButton}
            >
              {l.text}
            </span>
          )}
        </MenuItem>
      ))}
    </motion.ul>
  );
};

// const itemIds: number[] = [0, 1, 2, 3, 4];

import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import nav from "./nav.module.scss";
import { NavLink, Language } from "../../types/types";
import { FC } from "react";
import Link from "next/link";
import { useStoreState } from "easy-peasy";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};
type NavigationProps = {
  links: NavLink[];
};

export const Navigation: FC<NavigationProps> = ({ links }) => {
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  return (
    <motion.ul variants={variants} className={nav.ul}>
      {links?.map((l: NavLink, i: number) => (
        <MenuItem index={i} key={i}>
          <Link
            key={l.url + "nav"}
            href={`/[lang]${l.url}`}
            as={`/${Language[currentLanguage]}${l.url}`}
          >
            <a className={`${nav.navLink}`}>{l.name}</a>
          </Link>
        </MenuItem>
      ))}
    </motion.ul>
  );
};

// const itemIds: number[] = [0, 1, 2, 3, 4];

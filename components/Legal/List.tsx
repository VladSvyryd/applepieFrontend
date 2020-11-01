import { motion } from "framer-motion";
import { ListItem } from "./ListItem";
import nav from "./nav.module.scss";
import { Button, Language, LinkType } from "../../types/types";
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
  links: Button[];
  inverted: boolean;
  toggleMenu: any;
};

export const List: FC<NavigationProps> = ({ links, inverted, toggleMenu }) => {
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );

  return (
    <motion.ul variants={variants} className={nav.ul}>
      {links?.map((l: Button, i: number) => (
        <ListItem index={i} key={"legalLink-" + i}>
          {l.link_type === LinkType.internal ? (
            <Link
              key={l.function + "legal1"}
              href={`/${Language[currentLanguage]}/${l.function}`}
              as={`/${Language[currentLanguage]}/${l.function}`}
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
            <Link
              key={l.function + "legal2"}
              href={`${l.function}`}
              passHref
            >
              <a
                className={`${nav.navLink}`}
                style={inverted ? { color: "#403d55" } : {}}
                href={`${l.function}`}
                target="_blank"
                onClick={toggleMenu}
              >
                {l.text}
              </a>
            </Link>
          )}
        </ListItem>
      ))}
    </motion.ul>
  );
};

// const itemIds: number[] = [0, 1, 2, 3, 4];

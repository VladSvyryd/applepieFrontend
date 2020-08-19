import { motion } from "framer-motion";
import { FC } from "react";
import nav from "./nav.module.scss";

const variants = {
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

type MenuItemProps = { index: number };
export const ListItem: FC<MenuItemProps> = (props) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={nav.li}
    >
      <div className={nav.text}>{props.children}</div>
    </motion.li>
  );
};

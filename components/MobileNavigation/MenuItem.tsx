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

// const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
type MenuItemProps = { index: number };
export const MenuItem: FC<MenuItemProps> = (props) => {
  // const style = { border: `2px solid ${colors[props.index]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={nav.li}
    >
      <div className={nav.text}>{props.children}</div>
    </motion.li>
  );
};

import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import nav from "./nav.module.scss";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.ul variants={variants} className={nav.ul}>
    {itemIds.map((i: number) => (
      <MenuItem index={i} key={i} />
    ))}
  </motion.ul>
);

const itemIds: number[] = [0, 1, 2, 3, 4];

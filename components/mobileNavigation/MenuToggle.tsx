import { motion } from "framer-motion";
import { FC } from "react";
import nav from "./nav.module.scss";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke={!props.isOpen ? "#403d55" : "#fff"}
    strokeLinecap="round"
    {...props}
  />
);
type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};
export const MenuToggle: FC<MenuToggleProps> = ({ toggle, isOpen }) => (
  <div onClick={toggle} className={nav.button + " " + nav.onMobile}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        d="M 2 2.5 L 20 2.5"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        isOpen={isOpen}
      />
      <Path
        d="M 6 9.423 L 16 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        isOpen={isOpen}
        transition={{ duration: 0.1 }}
      />
      <Path
        d="M 2 16.346 L 20 16.346"
        variants={{
          closed: {
            d: "M 2 16.346 L 20 16.346",
          },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        isOpen={isOpen}
      />
    </svg>
  </div>
);

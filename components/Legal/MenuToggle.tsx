import { motion } from "framer-motion";
import { FC } from "react";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke={
      (!props.isOpen && !props.inverted) || (props.isOpen && props.inverted)
        ? "#403d55"
        : "#fff"
    }
    strokeLinecap="round"
    {...props}
  />
);
type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
  inverted: boolean;
  [x: string]: any;
};
export const MenuToggle: FC<MenuToggleProps> = (props) => {
  const { toggle, isOpen, inverted } = props;
  return (
    <motion.div
      {...props}
      onClick={toggle}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          isOpen={isOpen}
          inverted={inverted}
        />
        <Path
          d="M 6 9.423 L 16 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          isOpen={isOpen}
          transition={{ duration: 0.1 }}
          inverted={inverted}
        />
        <Path
          initial={{ d: "M 2 16.346 L 20 16.346" }}
          variants={{
            closed: {
              d: "M 2 16.346 L 20 16.346",
            },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          isOpen={isOpen}
          inverted={inverted}
        />
      </svg>
    </motion.div>
  );
};

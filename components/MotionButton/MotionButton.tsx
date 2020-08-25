import { motion } from "framer-motion";
import { FC } from "react";
import { ButtonType } from "../../types/types";

type MotionButtonProps = {
  // All other props
  text: string;
  buttonType: ButtonType;
  link?: string;
  external?: boolean;
  [x: string]: any;
};
const MotionButton: FC<MotionButtonProps> = (props) => {
  const { buttonType, link, text, external = false } = props;
  return buttonType === ButtonType.BUTTON ? (
    <motion.button {...props} whileTap={{ scale: 0.9 }} tabIndex={-1}>
      {text}
    </motion.button>
  ) : (
    <a
      href={link}
      target={`${external && "_blank"}`}
      style={{ color: "#ffffff" }}
      tabIndex={-1}
    >
      {text}
    </a>
  );
};

export default MotionButton;

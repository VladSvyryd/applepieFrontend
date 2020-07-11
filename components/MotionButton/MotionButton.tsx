import { motion } from "framer-motion";
import { FC } from "react";
import { ButtonType } from "../../types/types";
type MotionButtonProps = {
  // All other props
  text: string;
  buttonType: ButtonType;
  link?: string;
  [x: string]: any;
};
const MotionButton: FC<MotionButtonProps> = (props) => {
  const { buttonType, link, text } = props;
  console.log(buttonType);
  return buttonType === ButtonType.BUTTON ? (
    <motion.button {...props} whileTap={{ scale: 0.9 }} tabIndex={-1}>
      {text}
    </motion.button>
  ) : (
    <motion.button {...props} whileTap={{ scale: 0.9 }} tabIndex={-1}>
      <a href={link} target="_blank" style={{ color: "#ffffff" }} tabIndex={-1}>
        {text}
      </a>
    </motion.button>
  );
};

export default MotionButton;

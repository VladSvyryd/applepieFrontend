import { ReviewProps } from "../../types/types";
import review from "./review.module.scss";
import { motion } from "framer-motion";
import { useStoreState } from "../../hooks";

const Review: React.FC<ReviewProps> = (props) => {
  const anim = {
    hidden: (index: number) => ({
      scale: 0.5,
      x: `${index >= reviewIndex ? "-350px" : "-350px"}`,
      y: `${index >= reviewIndex ? "450px" : "-450px"}`,
      transition: {
        ease: "easeIn",
        duration: 1,
      },
    }),
    visible: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        ease: "easeIn",
        duration: 1,
      },
    },
  };
  const vertical = {
    hidden: { x: -150, y: -150, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  };
  const imgAnim = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
    },
  };

  const reviewIndex = useStoreState((state) => state.swiper.reviewIndex);

  return (
    <motion.div
      initial={"hidden"}
      animate={reviewIndex === props.index ? "visible" : "hidden"}
      variants={anim}
      className={`${review.grid}`}
      custom={props.index}
    >
      <motion.div className={review.avatar}>
        <motion.img
          src={`${props.review?.avatar?.url}`}
          variants={imgAnim}
          alt=""
        />
      </motion.div>
      <motion.div className={review.content_text} variants={vertical}>
        {props.review.content_text}
      </motion.div>
      <motion.div className={review.name} variants={vertical}>
        {props.review.name}
      </motion.div>
      <motion.div className={review.compony} variants={vertical}>
        {props.review.position}
      </motion.div>
    </motion.div>
  );
};

export default Review;

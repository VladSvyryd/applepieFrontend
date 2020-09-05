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
        ease: "easeInOut",
        duration: 0.5,
      },
    }),
    visible: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };
  // const vertical = {
  //   hidden: { x: -150, y: -150, opacity: 0 },
  //   visible: {
  //     x: 0,
  //     y: 0,
  //     opacity: 1,
  //   },
  // };
  const imgAnim = {
    hidden: { scale: 1 },
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
        <motion.div className={review.frame} variants={imgAnim}>
          <motion.img
            src={`${
              props.review?.avatar?.url ? props.review?.avatar?.url : ""
            }`}
            alt={props.review?.avatar?.alternativeText}
          />
        </motion.div>
      </motion.div>
      <motion.div className={review.content_text}>
        {props.review.content_text}
      </motion.div>
      <motion.div className={review.name}>{props.review.name}</motion.div>
      <motion.div className={review.company}>
        {props.review.position}
      </motion.div>
    </motion.div>
  );
};

export default Review;

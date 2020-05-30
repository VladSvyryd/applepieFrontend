import { ReviewProps } from "../../types/types";
import review from "./review.module.scss";
import { motion } from "framer-motion";
import { useStoreState } from "../../hooks";

const Review: React.FC<ReviewProps> = (props) => {
  const anim = {
    hidden: {
      scale: 1,
      transition: {
        ease: "easeIn",
      },
    },
    visible: {
      scale: 1,
      transition: {
        ease: "easeIn",
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
  // const imgAnim = {
  //   hidden: { scale: 0 },
  //   visible: {
  //     scale: 1,
  //   },
  // };

  const activeIndex = useStoreState((state) => state.swiper.reviewIndex);

  return (
    <>
      <motion.div
        initial={"hidden"}
        animate={activeIndex === props.index ? "visible" : "hidden"}
        variants={anim}
        className={`${review.grid}`}
      >
        <motion.div className={review.avatar}>
          {/* <motion.img
            src="http://localhost:1337/uploads/ava_d1d5ee2f77.jpeg"
            variants={imgAnim}
            alt=""
          /> */}
        </motion.div>
        <motion.div className={review.content_text} variants={vertical}>
          Working with Applepie is a blast. All the employee really work hard
          and keep us busy. Lovely environment to work on every day and get
          updated with new technologies. Applepie is one of the most welcoming
          and friendly environment I have ever worked on.
        </motion.div>
        <motion.div className={review.name} variants={vertical}>
          Anna Peter
        </motion.div>
        <motion.div className={review.compony} variants={vertical}>
          Product Manager, Сoca Cola
        </motion.div>
      </motion.div>
    </>
  );
};

export default Review;

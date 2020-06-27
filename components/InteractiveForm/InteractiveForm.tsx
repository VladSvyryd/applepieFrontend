import { useState, useEffect, FC } from "react";
import { motion } from "framer-motion";
import { useStoreState } from "easy-peasy";
import interactive_form from "./interactiveForm.module.scss";
import { useStoreActions } from "../../hooks";
const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
);
type InteractiveFormProps = { [x: string]: any };
export const InteractiveForm: FC<InteractiveFormProps> = (props) => {
  const width = useStoreState((state) => state.device.width);
  const height = useStoreState((state) => state.device.height);
  const invertedSlidesArray = useStoreState(
    (state) => state.swiper.invertedSlides
  );
  const activeIndex = useStoreState((state) => state.swiper.activeIndex);
  const [inverted, setInverted] = useState(false);
  const interactiveFormOpened = useStoreState(
    (state) => state.device.interactiveFormOpened
  );
  const setInterFormState = useStoreActions(
    (actions) => actions.device.setInterFormState
  );
  const [currentWindow, setCurrentWindow] = useState({
    width: width,
    height: height,
  });
  const onClick = () => {
    setInterFormState(!interactiveFormOpened);
    console.log(inverted);
  };

  const sidebar = {
    open: (custom: { width: number; height: number }) => ({
      clipPath: `circle(${custom.height + 700}px at calc(100% - 52px) 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: (_custom: { width: number; height: number }) => ({
      clipPath: `circle(0px at calc(100% - 52px)  35px)`,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }),
  };
  // const mobileMenuRef = useRef<HTMLElement>(null);
  // useOnClickOutside(mobileMenuRef, () => menuOpened && tOpen(false));
  useEffect(() => {
    setCurrentWindow({ width: width, height: height });
  }, [width, height]);
  useEffect(() => {
    invertedSlidesArray.some((s: number) => s === activeIndex)
      ? setInverted(true)
      : setInverted(false);
  }, [activeIndex]);
  const reveal = {
    open: { display: "flex" },
    closed: { display: "none", transition: { when: "afterChildren" } },
  };
  const prevDef = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      <motion.div
        className={interactive_form.inForm}
        initial={false}
        animate={interactiveFormOpened ? "open" : "closed"}
        variants={reveal}
        onClick={() => onClick()}
        // ref={mobileMenuRef}
        {...props}
      >
        <motion.div
          variants={sidebar}
          className={interactive_form.background}
          style={inverted ? { background: "white" } : {}}
          custom={currentWindow}
          onClick={(e) => prevDef(e)}
        >
          This is my Interaction Form
        </motion.div>
        <motion.svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          className={interactive_form.closed}
          variants={{
            closed: { scale: 0 },
            open: { scale: 1 },
          }}
        >
          <Path
            initial={{ d: "M 3 16.5 L 17 2.5" }}
            isOpen={interactiveFormOpened}
            inverted={inverted}
          />
          <Path
            initial={{ d: "M 3 2.5 L 17 16.346" }}
            isOpen={interactiveFormOpened}
            inverted={inverted}
          />
        </motion.svg>
      </motion.div>
    </>
  );
};

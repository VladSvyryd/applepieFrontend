import { useState, useEffect, FC, KeyboardEvent, useRef } from "react";
import { motion } from "framer-motion";
import { useStoreState } from "easy-peasy";
import interactive_form from "./interactiveForm.module.scss";
import { useStoreActions } from "../../hooks";
import useFocusTrap from "@charlietango/use-focus-trap";
import FormSlider from "../FormSlider/FormSlider";
import React from "react";
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
const InteractiveForm: FC<InteractiveFormProps> = (props) => {
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
        delay: 0.1,
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

  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef<any>();
  const handlePressEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      childRef.current.goToNext();
    }
    if (e.shiftKey && e.key === "Enter") {
      childRef.current.goToPrev();
    }
  };
  const ref = useFocusTrap();
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
        onKeyDown={(e) => handlePressEnter(e)}
        tabIndex={0}
        ref={ref}
      >
        <motion.div
          variants={sidebar}
          className={interactive_form.background}
          style={inverted ? { background: "white" } : {}}
          custom={currentWindow}
          onClick={(e) => prevDef(e)}
        >
          <div className={interactive_form.formSlider}>
            <FormSlider ref={childRef} />
          </div>
        </motion.div>
        <motion.div
          className={interactive_form.closed}
          variants={{
            closed: { scale: 0 },
            open: { scale: 1 },
          }}
        >
          <motion.svg width="23" height="23" viewBox="0 0 23 23">
            <Path
              initial={{
                d: "M 3 16.5 L 17 2.5",
              }}
              isOpen={interactiveFormOpened}
              inverted={inverted}
            />
            <Path
              initial={{ d: "M 3 2.5 L 16.5 16.5" }}
              isOpen={interactiveFormOpened}
              inverted={inverted}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </>
  );
};
export default React.memo(InteractiveForm);

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const Loading = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(true);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.pathname && setLoading(true);
    const handleComplete = (url: string) => {
      url !== router.pathname && animationCompleted && setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  const variants = {
    notActive: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 },
    active: {
      clipPath: [
        "polygon(0 0, 100% 0, 100% 0, 0 0)",
        "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        "polygon(0 0, 100% 0, 100% 0, 0 0)",
      ],
      opacity: [1, 1, 1, 0],
      //   x: ["0", "0", "0", "0", "-100%"],
      x: ["0%", "0%", "0%", "-100%"],
      rotate: [0, 0, 270, 270],
      transition: {
        duration: 2.3,
        times: [0, 0.2, 0.9, 1],
        ease: "easeInOut",
      },
    },
  };
  const onComplete = () => {
    console.log("Animation completed");
    setAnimationCompleted(true);
  };
  return (
    <AnimatePresence>
      <motion.div
        animate={loading ? "active" : "notActive"}
        variants={variants}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,255,0,1)",
          zIndex: 1000,
        }}
        // exit={{ opacity: 0, transition: { duration: 2 } }}
        onAnimationComplete={() => onComplete()}
      >
        LAODING
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Loading = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.pathname && setLoading(true);
    const handleComplete = (url: string) =>
      url !== router.pathname && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading ? (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "rgba(0,255,0,.4)",
        zIndex: 1000,
      }}
    >
      LAODING
    </div>
  ) : null;
};

export default Loading;

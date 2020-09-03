import { useState, useEffect } from "react";
import { ORIENTATION } from "../model/device";
import parser from "ua-parser-js";

export const useWindowProps = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [deviceScreenOrientation, setDeviceScreenOrientation] = useState(
    ORIENTATION.portrait
  );
  // const[device,setDevice]=useState("")
  const updateWindowProps = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const setScreenOrientation = () => {
    console.log(window);
    if (window.orientation === 0) {
      console.log("orientation: portrait");
      setDeviceScreenOrientation(ORIENTATION.portrait);
    } else if (window.orientation === 90) {
      console.log("orientation: landscape");
      setDeviceScreenOrientation(ORIENTATION.landscape);
    }
  };

  useEffect(() => {
    //@ts-ignore

    alert(JSON.stringify(parser(window.platform.ua), null, 2));
    //@ts-ignore

    alert(JSON.stringify(window.platform, null, 2));

    const handleResize = () => updateWindowProps();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", setScreenOrientation);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", setScreenOrientation);
    };
  });

  return { width, height, deviceScreenOrientation };
};

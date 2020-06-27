import { useState, useEffect } from "react";
import { ORIENTATION } from "../model/device";

export const useWindowProps = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const[deviceScreenOrientation,setDeviceScreenOrientation]=useState(ORIENTATION.portrait)
  // const[device,setDevice]=useState("")
  const updateWindowProps = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const setScreenOrientation = () => {
    console.log(window)
    if (window.matchMedia("(orientation: portrait)").matches) {
      console.log('orientation: portrait');
      setDeviceScreenOrientation(ORIENTATION.portrait)
    }else if (window.matchMedia("(orientation: landscape)").matches) {
      console.log('orientation: landscape');
      setDeviceScreenOrientation(ORIENTATION.landscape)
    }
  }

  useEffect(() => {
    const handleResize = () => updateWindowProps();
    window.addEventListener("resize", handleResize);
    window.addEventListener('orientationchange', setScreenOrientation);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", setScreenOrientation);
    };
  });

  return { width, height,deviceScreenOrientation };
};

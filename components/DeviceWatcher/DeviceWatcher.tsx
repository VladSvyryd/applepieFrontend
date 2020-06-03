import { useStoreActions } from "../../hooks";
import { useEffect } from "react";
import { useWindowWidth } from "../../util/useWindowWidth";

export default () => {
  const width = useWindowWidth();
  const setCurrentDeviceWidth = useStoreActions(
    (actions) => actions.device.setCurrentDeviceWidth
  );
  const defineBulletPositions = () => {
    setCurrentDeviceWidth(width);
    console.log(width);
  };

  useEffect(() => {
    defineBulletPositions();
  }, [width]);

  return <div></div>;
};

import { useStoreActions } from "../../hooks";
import { useEffect } from "react";
import { useWindowProps } from "../../util/useWindowProps";
import React from "react";

function  DeviceWatcher () {
  const { width, height,deviceScreenOrientation, } = useWindowProps();
  const setCurrentDeviceProps = useStoreActions(
    (actions) => actions.device.setCurrentDeviceProps
  );
  const setDeviceOrientation = useStoreActions(
    (actions) => actions.device.setDeviceOrientation
  );
  // const setDeviceType = useStoreActions(
  //   (actions) => actions.device.setDeviceType
  // );
  const updateWindowProps = () => {
    setCurrentDeviceProps({ width, height });
    
  };

  useEffect(() => {
    updateWindowProps();
  }, [width, height]);
  useEffect(() => {
    setDeviceOrientation(deviceScreenOrientation)
  }, [deviceScreenOrientation]);
  return <></>;
};
export default React.memo(DeviceWatcher)
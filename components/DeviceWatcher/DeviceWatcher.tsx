import { useStoreActions } from "../../hooks";
import { useEffect } from "react";
import { useWindowProps } from "../../util/useWindowProps";

export default () => {
  const { width, height } = useWindowProps();
  const setCurrentDeviceProps = useStoreActions(
    (actions) => actions.device.setCurrentDeviceProps
  );
  const updateWindowProps = () => {
    setCurrentDeviceProps({ width, height });
  };

  useEffect(() => {
    updateWindowProps();
  }, [width, height]);

  return <></>;
};

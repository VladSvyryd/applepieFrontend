import { Action, action } from "easy-peasy";
import { DEVICE } from "../types/types";

export interface DeviceModel {
  device: DEVICE;
  width: number;
  setCurrentDeviceWidth: Action<DeviceModel, number>;
}

const device: DeviceModel = {
  device: DEVICE.DESKTOP,
  width: 0,
  setCurrentDeviceWidth: action((state, payload) => {
    state.width = payload;
  }),
};

export default device;

import { Action, action } from "easy-peasy";
import { DEVICE } from "../types/types";

type WindowPayload = {
  width: number;
  height: number;
};
type isOpened = boolean;

export interface DeviceModel {
  device: DEVICE;
  width: number;
  height: number;
  menuOpened: boolean;
  setCurrentDeviceProps: Action<DeviceModel, WindowPayload>;
  setMenuState: Action<DeviceModel, isOpened>;
}

const device: DeviceModel = {
  device: DEVICE.DESKTOP,
  width: 0,
  height: 0,
  menuOpened: false,
  setCurrentDeviceProps: action((state, payload) => {
    state.width = payload.width;
    state.height = payload.height;
  }),
  setMenuState: action((state, payload) => {
    state.menuOpened = payload;
  }),
};

export default device;

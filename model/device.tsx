import { Action, action } from "easy-peasy";
// import { DEVICE } from "../types/types";

type WindowPayload = {
  width: number;
  height: number;
};
type isOpened = boolean;
export enum ORIENTATION {
  portrait,
  landscape
}

export interface DeviceModel {
  device: string;
  width: number;
  height: number;
  menuOpened: boolean;
  orientation: ORIENTATION;
  setCurrentDeviceProps: Action<DeviceModel, WindowPayload>;
  setMenuState: Action<DeviceModel, isOpened>;
  setDeviceOrientation: Action<DeviceModel, ORIENTATION>;
  setDeviceType: Action<DeviceModel, string>;
}

const device: DeviceModel = {
  device: "",
  width: 0,
  height: 0,
  menuOpened: false,
  orientation: ORIENTATION.portrait,
  setDeviceType: action((state, payload) => {
    state.device = payload;
  }),
  setDeviceOrientation: action((state, payload) => {
    state.orientation = payload;
  }),
  setCurrentDeviceProps: action((state, payload) => {
    state.width = payload.width;
    state.height = payload.height;
  }),
  setMenuState: action((state, payload) => {
    state.menuOpened = payload;
  }),
};

export default device;

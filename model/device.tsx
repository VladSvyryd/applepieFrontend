import { Action, action } from "easy-peasy";
// import { DEVICE } from "../types/types";

type WindowPayload = {
  width: number;
  height: number;
};
type isOpened = boolean;
export enum ORIENTATION {
  portrait,
  landscape,
}

export interface DeviceModel {
  device: string;
  width: number;
  height: number;
  menuOpened: boolean;
  interactiveFormOpened: boolean;
  orientation: ORIENTATION;
  setCurrentDeviceProps: Action<DeviceModel, WindowPayload>;
  setMenuState: Action<DeviceModel, isOpened>;
  setInterFormState: Action<DeviceModel, isOpened>;
  setDeviceOrientation: Action<DeviceModel, ORIENTATION>;
  setDeviceType: Action<DeviceModel, string>;
  legalOpened: boolean;
  setLegalOpened: Action<DeviceModel, boolean>;
}

const device: DeviceModel = {
  device: "",
  width: 0,
  height: 0,
  menuOpened: false,
  orientation: ORIENTATION.landscape,
  interactiveFormOpened: false,
  legalOpened: false,
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
  setInterFormState: action((state, payload = !state.interactiveFormOpened) => {
    state.interactiveFormOpened = payload;
  }),
  setLegalOpened: action((state, payload = !state.legalOpened) => {
    state.legalOpened = payload;
  }),
};

export default device;

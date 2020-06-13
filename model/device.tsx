import { Action, action } from "easy-peasy";
import { DEVICE } from "../types/types";

type WindowPayload = {
  width: number;
  height: number;
};

export interface DeviceModel {
  device: DEVICE;
  width: number;
  height: number;
  setCurrentDeviceProps: Action<DeviceModel, WindowPayload>;
}

const device: DeviceModel = {
  device: DEVICE.DESKTOP,
  width: 0,
  height: 0,
  setCurrentDeviceProps: action((state, payload) => {
    state.width = payload.width;
    state.height = payload.height;
  }),
};

export default device;

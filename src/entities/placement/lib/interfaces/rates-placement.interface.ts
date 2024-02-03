import { IPlacement } from "./placement.interface";

export interface IRatesPlacement extends IPlacement {
  shouldUpdate: boolean;
}

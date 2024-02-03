import { IPlacement } from "./placement.interface";

export interface IPlacementLog extends IPlacement {
  createdAt: string;
  manager: {
    email: string;
  };
}

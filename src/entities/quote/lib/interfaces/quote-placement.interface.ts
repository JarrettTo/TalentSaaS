import { IPlacement } from "@entities/placement/lib/interfaces";
import { IDeliverables } from "@shared/lib/types";

export interface IQuotePlacement extends IPlacement, IDeliverables {
  deliverables: number;
  isCrossPost: boolean;
  shouldUpdate: boolean;
}

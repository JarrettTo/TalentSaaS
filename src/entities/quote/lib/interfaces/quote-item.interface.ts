import { IDeliverables } from "@shared/lib/types";
import { IInfluencer } from "@widgets/influencer";

export interface IQuoteItem extends IDeliverables {
  id: number;
  expiredAt: string;
  isInstagram: boolean;
  isYoutube: boolean;
  isTiktok: boolean;
  isArchived: boolean;
  influencer: IInfluencer;
  talentFee?: string;
  totalFee: string | number;
}

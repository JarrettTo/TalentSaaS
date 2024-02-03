import { IPlacement } from "@entities/placement/lib/interfaces";
import { IQuotePlacement } from "../interfaces";

export function extendPlacement(placement: IPlacement): IQuotePlacement {
  return {
    ...placement,
    deliverables: 0,
    isCrossPost: false,
    crossPost: 0,
    instaStorySet: 0,
    linkInBio: 0,
    amplificationDigital: 0,
    amplificationDigitalMonths: 0,
    amplificationDigitalMonthsRange: 0,
    amplificationTraditional: 0,
    amplificationTraditionalMonths: 0,
    amplificationTraditionalMonthsRange: 0,
    exclusivity: 0,
    exclusivityMonths: 0,
    exclusivityMonthsRange: 0,
    shootDay: 0,
    paidMedia: 0,
    UGCCreative: 0,
    shouldUpdate: false,
  };
}

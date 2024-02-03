import { IDeliverables } from "@shared/lib/types";
import { DeliverablesDictionaryEntries } from "../constants";

export function calculateTotalFee(deliverables: IDeliverables, talentFee: number) {
  let totalFee = 0;
  DeliverablesDictionaryEntries.forEach(([deliverableKey, deliverableInfo]) => {
    if (
      deliverableKey === "amplificationDigitalMonthsRange" ||
      deliverableKey === "amplificationTraditionalMonthsRange" ||
      deliverableKey === "exclusivityMonthsRange"
    ) {
      return;
    }
    let rangeMultiplier = 1;
    switch (deliverableKey) {
      case "amplificationDigitalMonths": {
        rangeMultiplier = deliverables.amplificationDigitalMonthsRange;
        break;
      }
      case "amplificationTraditionalMonths": {
        rangeMultiplier = deliverables.amplificationTraditionalMonthsRange;
        break;
      }
      case "exclusivityMonths": {
        rangeMultiplier = deliverables.exclusivityMonthsRange;
        break;
      }
      default: {
        rangeMultiplier = 1;
      }
    }
    totalFee +=
      deliverables[deliverableKey] *
      rangeMultiplier *
      talentFee *
      deliverableInfo.multiplier;
  });
  return totalFee;
}

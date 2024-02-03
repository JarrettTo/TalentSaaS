import { IDeliverableInfo, IDeliverables } from "@shared/lib/types";

export const DeliverablesDictionary: Record<keyof IDeliverables, IDeliverableInfo> = {
  rePost: {
    title: "Re-post",
    description: "A Re-post from one social platform to another",
    multiplier: 0,
  },
  rePostIG: {
    title: "Re-post IG",
    description: "A Re-post from one social platform to another",
    multiplier: 0.75,
  },
  rePostYT: {
    title: "Re-post YouTube",
    description: "A Re-post from one social platform to another",
    multiplier: 0.75,
  },
  rePostTikTok: {
    title: "Re-post TikTok",
    description: "A Re-post from one social platform to another",
    multiplier: 0.75,
  },
  amplificationDigital: {
    title: "Amplification (Digital)",
    description: "Digital amplification licensing",
    multiplier: 0.12,
  },

  amplificationTraditional: {
    title: "Amplification (Traditional)",
    description: "TVC, Cinema and Out of Home licensing",
    multiplier: 0.12,
  },
  exclusivity: {
    title: "Exclusivity",
    description: "Segment exclusivity (as defined in contract)",
    multiplier: 1,
  },

};

export const DeliverablesDictionaryEntries = Object.entries(DeliverablesDictionary) as [
  keyof IDeliverables,
  IDeliverableInfo
][];

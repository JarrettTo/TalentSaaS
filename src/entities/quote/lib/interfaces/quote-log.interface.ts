export interface IQuoteLog {
  id: number;
  quoteId: number;
  crossPost: number;
  instaStorySet: number;
  linkInBio: number;
  amplificationDigital: number;
  amplificationDigitalMonths: number;
  amplificationDigitalMonthsRange: number;
  amplificationTraditional: number;
  amplificationTraditionalMonths: number;
  amplificationTraditionalMonthsRange: number;
  exclusivity: number;
  exclusivityMonths: number;
  exclusivityMonthsRange: number;
  shootDay: number;
  paidMedia: 1;
  UGCCreative: number;
  isInstagram: boolean;
  isYoutube: boolean;
  isTiktok: boolean;
  isArchived: boolean;
  createdAt: string;
  manager: {
    email: string;
  };
}

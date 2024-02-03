export interface IUpdateQuoteDto {
  quoteId: number;
  influencerId: number;
  totalFee: number;
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
  paidMedia: number;
  UGCCreative: number;
  isInstagram: boolean;
  isYoutube: boolean;
  isTiktok: boolean;
}

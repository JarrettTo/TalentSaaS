export interface IPlacementLastLog {
  id: number;
  type: number;
  influencer: {
    id: number;
  };
  talantFee: string | null;
  agencyFee: string | null;
  totalImpressionsByCurrentMonth: string | null;
  AUorNZAuditory: string | null;
  westAuditory: string | null;
  sum: string | null;
  priceInUSD: string | null;
  priceInAUD: string | null;
  boosting: string | null;
  createdAt: string;
  manager: {
    email: string;
  };
}

import { IQuoteItem } from "./quote-item.interface";

export interface IQuote {
  id: number;
  name: string;
  brand: string;
  totalFee: number;
  verifyCode: string;
  quotes: IQuoteItem[];
}

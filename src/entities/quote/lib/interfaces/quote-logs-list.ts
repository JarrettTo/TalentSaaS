import { IQuoteLog } from "./quote-log.interface";

export interface IQuoteLogsList {
  id: number;
  expiredAt: string;
  quotesLogs: IQuoteLog[];
}

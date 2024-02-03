import { IQuoteItem } from "./quote-item.interface";

export interface IEditableQuoteItem extends IQuoteItem {
  shouldUpdate: boolean;
}

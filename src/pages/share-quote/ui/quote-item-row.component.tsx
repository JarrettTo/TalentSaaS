import { DeliverablesDictionaryEntries, IQuoteItem } from "@entities/quote";
import { calculateTotalFee } from "@entities/quote/lib/utils/calculate-total-fee";
import clsx from "clsx";

const cellClasses = "py-6 px-6";

interface IQuoteItemRowProps {
  quoteItem: IQuoteItem;
}

export const QuoteItemRow = (props: IQuoteItemRowProps) => {
  const { quoteItem } = props;

  const renderDeliverables = (quoteItem: IQuoteItem) => {
    return DeliverablesDictionaryEntries.map(([deliverableKey, deliverableInfo]) => {
      if (!quoteItem[deliverableKey]) {
        return null;
      }
      if (!deliverableInfo.title) {
        return null;
      }
      let deliverablesPriceMultiplier = 1;
      switch (deliverableKey) {
        case "amplificationDigitalMonths": {
          deliverablesPriceMultiplier = quoteItem.amplificationDigitalMonthsRange;
          break;
        }
        case "amplificationTraditionalMonths": {
          deliverablesPriceMultiplier = quoteItem.amplificationTraditionalMonthsRange;
          break;
        }
        case "exclusivityMonths": {
          deliverablesPriceMultiplier = quoteItem.exclusivityMonthsRange;
          break;
        }
        default: {
          deliverablesPriceMultiplier = 1;
        }
      }
      const deliverablesPrice =
        quoteItem[deliverableKey] *
        Number(quoteItem.talentFee || 0) *
        deliverablesPriceMultiplier *
        deliverableInfo.multiplier;
      return (
        <p>
          {deliverableInfo.title} ${deliverablesPrice}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-4 last:rounded-b-2xl overflow-hidden group even:bg-purple">
      <div className={cellClasses}>
        <p>
          {quoteItem.influencer.firstname} {quoteItem.influencer.lastname}
        </p>
      </div>
      <div className={cellClasses}>
        {quoteItem.isYoutube && <p>YouTube</p>}
        {quoteItem.isInstagram && <p>Instagram</p>}
        {quoteItem.isTiktok && <p>TikTok</p>}
      </div>
      <div className={clsx(cellClasses, "relative")}>{renderDeliverables(quoteItem)}</div>
      <div className={cellClasses}>
        <p>${calculateTotalFee({ ...quoteItem }, Number(quoteItem.talentFee || 0))}</p>
      </div>
    </div>
  );
};

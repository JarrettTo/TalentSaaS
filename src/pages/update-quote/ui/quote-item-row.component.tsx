import { DeliverablesDictionaryEntries, IEditableQuoteItem } from "@entities/quote";
import { calculateTotalFee } from "@entities/quote/lib/utils/calculate-total-fee";
import { Button, NumberInput } from "@mantine/core";
import clsx from "clsx";
import { useEffect, useState } from "react";

const cellClasses = "grow py-6 px-6";

interface IQuoteItemRowProps {
  quoteItem: IEditableQuoteItem;
  onDeliverablesEditClick: (
    quoteItem: IEditableQuoteItem,
    deliverablesAmount: number
  ) => void;
}

export const QuoteItemRow = (props: IQuoteItemRowProps) => {
  const { quoteItem, onDeliverablesEditClick } = props;

  const [deliverablesAmount, setDeliverablesAmount] = useState(0);

  useEffect(() => {
    let deliverablesSum = 0;
    DeliverablesDictionaryEntries.forEach(([deliverableKey]) => {
      if (
        deliverableKey === "amplificationDigitalMonthsRange" ||
        deliverableKey === "amplificationTraditionalMonthsRange" ||
        deliverableKey === "exclusivityMonthsRange"
      ) {
        return;
      }
      deliverablesSum += quoteItem[deliverableKey];
    });
    setDeliverablesAmount(deliverablesSum);
  }, [quoteItem]);

  const renderDeliverables = (quoteItem: IEditableQuoteItem) => {
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
        Number(quoteItem?.talentFee || 0) *
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
    <div className="grid grid-cols-[1fr,1fr,1fr,2fr,1fr] last:rounded-b-2xl overflow-hidden group even:bg-purple">
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
      <div className={cellClasses}>
        <NumberInput
          value={deliverablesAmount}
          min={0}
          max={100}
          onChange={(value) => setDeliverablesAmount(value || 0)}
        />
      </div>
      <div className={clsx(cellClasses, "flex gap-2 justify-between items-start")}>
        <div>{renderDeliverables(quoteItem)}</div>
        <div>
          <Button
            color="dark"
            className="w-5 h-5 p-0 flex justify-center items-center"
            onClick={() => onDeliverablesEditClick(quoteItem, deliverablesAmount)}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
            >
              <title />
              <g id="Complete">
                <g id="edit">
                  <g>
                    <path
                      d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                    <polygon
                      fill="none"
                      points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </Button>
        </div>
      </div>
      <div className={cellClasses}>
        <p>${calculateTotalFee({ ...quoteItem }, Number(quoteItem?.talentFee || 0))}</p>
      </div>
    </div>
  );
};

import { PlacementDictionary } from "@entities/placement";
import { IQuotePlacement, DeliverablesDictionaryEntries } from "@entities/quote";
import { calculateTotalFee } from "@entities/quote/lib/utils/calculate-total-fee";
import { Button } from "@mantine/core";
import clsx from "clsx";

const cellClasses = "py-6 px-6";

interface IQuoteOptionsRowProps {
  quotePlacement: IQuotePlacement;
  onDeliverablesEdit: (quotePlacement: IQuotePlacement) => void;
}

export const QuoteOptionsRow = (props: IQuoteOptionsRowProps) => {
  const { quotePlacement, onDeliverablesEdit } = props;

  const renderPostTypes = () => {
    return DeliverablesDictionaryEntries.map(([deliverableKey, deliverableInfo]) => {
      if (!quotePlacement[deliverableKey]) {
        return null;
      }
      if (!deliverableInfo.title) {
        return null;
      }
      let deliverablesPriceMultiplier = 1;
      switch (deliverableKey) {
        case "amplificationDigitalWeeks": {
          deliverablesPriceMultiplier = quotePlacement.amplificationDigitalWeeksRange;
          break;
        }
        case "amplificationTraditionalWeeks": {
          deliverablesPriceMultiplier =
            quotePlacement.amplificationTraditionalWeeksRange;
          break;
        }
        case "exclusivityWeeks": {
          deliverablesPriceMultiplier = quotePlacement.exclusivityWeeksRange;
          break;
        }
        default: {
          deliverablesPriceMultiplier = 1;
        }
      }
      const deliverablesPrice =
        Number(quotePlacement[deliverableKey]) *
        Number(quotePlacement.talantFee) *
        deliverablesPriceMultiplier *
        deliverableInfo.multiplier;
      return (
        <p key={deliverableKey}>
          {deliverableInfo.title} ${deliverablesPrice.toLocaleString('en-us')}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-[1fr,1fr,2fr,1fr] last:rounded-b-2xl overflow-hidden group even:bg-purple">
      <div className={cellClasses}>
        <p>
          {quotePlacement.influencer.firstname} {quotePlacement.influencer.lastname}
        </p>
      </div>
      <div className={cellClasses}>
        <p>{PlacementDictionary[quotePlacement.type]}</p>
      </div>
      <div className={clsx(cellClasses, "flex gap-2 justify-between items-start")}>
        <div>{renderPostTypes()}</div>
        {quotePlacement.isCrossPost && (
          <div>
            <Button
              color="dark"
              className="w-5 h-5 p-0 flex justify-center items-center"
              onClick={() => onDeliverablesEdit(quotePlacement)}
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
        )}
      </div>
      <div className={clsx(cellClasses, "group-even:bg-violet-100")}>
        <p>
          ${calculateTotalFee({ ...quotePlacement }, Number(quotePlacement.talantFee)).toLocaleString('en-us')}
        </p>
      </div>
    </div>
  );
};

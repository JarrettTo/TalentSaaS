import clsx from "clsx";
import { Link } from "react-router-dom";
import { IQuote } from "@entities/quote";
import { Button, Checkbox } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { IInfluencer } from "@widgets/influencer";
import { toast } from "react-toastify";

const cellClasses = "px-3 py-3";

type SavedQuoteRawProps = {
  quote: IQuote;
  isSelected: boolean;
  onSelect: (quoteId: number, isSelected: boolean) => void;
};

export const SavedQuoteRaw = (props: SavedQuoteRawProps) => {
  const { quote, isSelected, onSelect } = props;

  const [quoteInfluencers, setQuoteInfluencers] = useState<IInfluencer[]>([]);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    let quoteTotalFee = 0;
    const influencers: IInfluencer[] = [];
    quote.quotes.forEach((quoteItem) => {
      quoteTotalFee += Number(quoteItem.totalFee);
      if (influencers.some((influencer) => influencer.id === quoteItem.influencer.id)) {
        return;
      }
      influencers.push(quoteItem.influencer);
    });
    setQuoteInfluencers(influencers);
    setTotalFee(quoteTotalFee);
  }, [quote]);

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    onSelect(quote.id, checked);
  };

  const handleShareLinkCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.host}/share/quote/${quote.verifyCode}`)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Unable to copy share link"));
  };

  return (
    <div className="grid grid-cols-5 px-3 items-center">
      <div className={clsx(cellClasses, "flex items-center gap-3")}>
        <Checkbox color="dark" size="md" checked={isSelected} onChange={handleSelect} />
        <div>
          {Array.from(quoteInfluencers).map((quoteInfluencer) => (
            <p>
              <Link
                key={quoteInfluencer.id}
                to={`/app/influencer/insights/${quoteInfluencer.id}/youtube`}
                className="text-black h-fit no-underline hover:text-orange"
              >
                {`${quoteInfluencer.firstname} ${quoteInfluencer.lastname}`}
              </Link>
            </p>
          ))}
        </div>
      </div>
      <div className={cellClasses}>
        <p className="truncate">{quote.brand}</p>
      </div>
      <div className={cellClasses}>
        <p className="truncate">{quote.name}</p>
      </div>
      <div className={clsx(cellClasses)}>
        <p>${totalFee}</p>
      </div>
      <div className={cellClasses}>
        <div className="flex gap-5">
          <Link to={`/app/quote/${quote.id}`}>
            <Button color="dark" radius="md" className="w-full">
              Edit
            </Button>
          </Link>
          <Button
            color="orange"
            radius="md"
            className="w-full"
            onClick={handleShareLinkCopy}
          >
            Copy link
          </Button>
        </div>
      </div>
    </div>
  );
};

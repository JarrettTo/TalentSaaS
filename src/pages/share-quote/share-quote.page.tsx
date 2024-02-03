import { useQuoteByVerificationCodeQuery } from "@entities/quote";
import { Loader, clsx } from "@mantine/core";
import { useParams } from "react-router-dom";
import { QuoteItemRow } from "./ui";

const cellClasses = "py-6 px-6";

export const ShareQuotePage = () => {
  const { quoteVerificationCode } = useParams();
  const {
    data: quote,
    isLoading: isQuoteLoading,
    isError: isQuoteError,
  } = useQuoteByVerificationCodeQuery(quoteVerificationCode);

  if (isQuoteLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isQuoteError || !quote) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>
          Looks like some problem with quote occurs
          <br />
          Please, try again later
        </p>
      </div>
    );
  }

  return (
    <div className="container py-10 min-h-screen">
      <h1 className="mb-3">{quote.brand}</h1>
      <h2 className="mb-7">{quote.name}</h2>
      <div className="mb-5 bg-white text-xl rounded-2xl shadow-xl">
        <div className="grid grid-cols-4 border-0 border-b border-solid">
          <div className={clsx(cellClasses)}>
            <p>Talent</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Placement</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Deliverables</p>
          </div>
          <div className={clsx(cellClasses)}>
            <p>Total Fee inc AST (ex GST)</p>
          </div>
        </div>
        {quote.quotes.map((quoteItem) => (
          <QuoteItemRow key={quoteItem.id} quoteItem={quoteItem} />
        ))}
      </div>
    </div>
  );
};

import { getQuoteById } from "@entities/quote/api";
import { IQuote } from "@entities/quote/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useQuoteByIdQuery(quoteId?: number) {
  return useQuery<IQuote | null, any>({
    queryKey: [QueryKeys.Quote, `quote-${quoteId}`],
    queryFn: () => (typeof quoteId === "number" ? getQuoteById(quoteId) : null),
    enabled: typeof quoteId === "number",
  });
}

import { getQuoteLogById } from "@entities/quote/api";
import { IQuoteLogsList } from "@entities/quote/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useQuoteLogByIdQuery(quoteId?: number) {
  return useQuery<IQuoteLogsList | null, any>({
    queryKey: [QueryKeys.QuoteLog, `quote-log-${quoteId}`],
    queryFn: () => (typeof quoteId === "number" ? getQuoteLogById(quoteId) : null),
    enabled: typeof quoteId === "number",
  });
}

import { getQuoteByVerificationCode } from "@entities/quote/api";
import { IQuote } from "@entities/quote/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useQuoteByVerificationCodeQuery(quoteVerificationCode?: string) {
  return useQuery<IQuote | null, any>({
    queryKey: [QueryKeys.SharableQuote, `quote-code-${quoteVerificationCode}`],
    queryFn: () =>
      typeof quoteVerificationCode === "string"
        ? getQuoteByVerificationCode(quoteVerificationCode)
        : null,
    enabled: typeof quoteVerificationCode === "string",
  });
}

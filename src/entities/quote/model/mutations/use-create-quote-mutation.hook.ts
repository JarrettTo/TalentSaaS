import { ICreateQuoteDto, createQuote } from "@entities/quote/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useCreateQuoteMutation() {
  return useMutation<void, any, ICreateQuoteDto>({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Quotes] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Quote] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QuoteLog] });
    },
  });
}

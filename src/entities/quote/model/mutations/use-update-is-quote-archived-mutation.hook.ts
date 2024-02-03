import { IUpdateIsQuoteArchivedDto, updateIsQuoteArchived } from "@entities/quote/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useUpdateIsQuoteArchivedMutation() {
  return useMutation<void, any, IUpdateIsQuoteArchivedDto>({
    mutationFn: updateIsQuoteArchived,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Quotes] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Quote] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.QuoteLog] });
    },
  });
}

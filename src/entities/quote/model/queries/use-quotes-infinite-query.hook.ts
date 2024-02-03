import { getActiveQuotes, getArchivedQuotes } from "@entities/quote/api";
import { SavedQuotesTypesEnum } from "@entities/quote/lib/enums";
import { IQuote } from "@entities/quote/lib/interfaces";
import {
  IGetPaginatedItemsQueryParams,
  IGetPaginatedItemsResponseDto,
} from "@shared/api/dto/get-paginated-items.dto";
import { QueryKeys } from "@shared/lib/enums";
import { useInfiniteQuery } from "@tanstack/react-query";

type QuotesInfiniteQueryParams = Omit<IGetPaginatedItemsQueryParams, "offset"> & {
  type: SavedQuotesTypesEnum;
};

export function useQuotesInfiniteQuery(queryParams: QuotesInfiniteQueryParams) {
  return useInfiniteQuery<IGetPaginatedItemsResponseDto<IQuote>, any>({
    queryKey: [QueryKeys.Quotes, `type-${queryParams.type}`],
    queryFn: ({ pageParam }) => {
      switch (queryParams.type) {
        case SavedQuotesTypesEnum.Active: {
          return getActiveQuotes({
            limit: queryParams.limit,
            offset: Number(pageParam) * queryParams.limit,
          });
        }
        case SavedQuotesTypesEnum.Archived: {
          return getArchivedQuotes({
            limit: queryParams.limit,
            offset: Number(pageParam) * queryParams.limit,
          });
        }
        default: {
          return { totalCount: 0, items: [] };
        }
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage || typeof lastPageParam !== "number") {
        return null;
      }
      if (lastPage.totalCount / ((lastPageParam + 1) * queryParams.limit) <= 1) {
        return null;
      }
      return lastPageParam + 1;
    },
  });
}

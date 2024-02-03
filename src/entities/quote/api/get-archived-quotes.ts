import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IQuote } from "../lib/interfaces";
import {
  IGetPaginatedItemsQueryParams,
  IGetPaginatedItemsResponseDto,
} from "@shared/api/dto/get-paginated-items.dto";

export async function getArchivedQuotes(queryParams: IGetPaginatedItemsQueryParams) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IGetPaginatedItemsResponseDto<IQuote>>,
      AxiosResponse<IBaseResponseDto<IGetPaginatedItemsResponseDto<IQuote>>, void>,
      void
    >("/quote/archived", { params: queryParams });
    return data.data;
  } catch (error: any) {
    console.error("get archived quotes error:", error);
    throw error;
  }
}

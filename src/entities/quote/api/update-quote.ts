import { baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IUpdateQuoteDto } from "./dto";

export async function updateQuote(updateQuoteDto: IUpdateQuoteDto) {
  const { quoteId, ...requestBodyDto } = updateQuoteDto;
  try {
    await baseClient.patch<
      void,
      AxiosResponse<void, typeof requestBodyDto>,
      typeof requestBodyDto
    >(`/quote/${quoteId}`, requestBodyDto);
  } catch (error: any) {
    console.error("update quote error:", error);
    throw error;
  }
}

import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IQuote } from "../lib/interfaces";

export async function getQuoteById(quoteId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IQuote>,
      AxiosResponse<IBaseResponseDto<IQuote>, void>,
      void
    >(`/quote/${quoteId}`);
    return data.data;
  } catch (error: any) {
    console.error("get quote error:", error);
    throw error;
  }
}

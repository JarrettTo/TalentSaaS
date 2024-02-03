import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IQuoteLogsList } from "../lib/interfaces";

export async function getQuoteLogById(quoteId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IQuoteLogsList>,
      AxiosResponse<IBaseResponseDto<IQuoteLogsList>, void>,
      void
    >(`/quote/${quoteId}/log`);
    return data.data;
  } catch (error: any) {
    console.error("get quote error:", error);
    throw error;
  }
}

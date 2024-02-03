import { baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { ICreateQuoteDto } from "./dto";

export async function createQuote(createQuoteDto: ICreateQuoteDto) {
  try {
    await baseClient.post<void, AxiosResponse<void, ICreateQuoteDto>, ICreateQuoteDto>(
      "/quote",
      createQuoteDto
    );
  } catch (error: any) {
    console.error("create quotes error:", error);
    throw error;
  }
}

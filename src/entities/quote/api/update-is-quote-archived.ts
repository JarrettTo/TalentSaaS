import { baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IUpdateIsQuoteArchivedDto } from "./dto";

export async function updateIsQuoteArchived(
  updateIsQuoteArchivedDto: IUpdateIsQuoteArchivedDto
) {
  const { quoteId, isArchived } = updateIsQuoteArchivedDto;
  try {
    await baseClient.patch<
      void,
      AxiosResponse<void, IUpdateIsQuoteArchivedDto>,
      IUpdateIsQuoteArchivedDto
    >(`/quote/${quoteId}/set-archived?isArchived=${isArchived}`);
  } catch (error: any) {
    console.error("update is quote archived error:", error);
    throw error;
  }
}

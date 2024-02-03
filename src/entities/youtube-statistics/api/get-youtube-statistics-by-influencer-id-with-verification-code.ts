import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IYoutubeLocalStatistics } from "../lib/interfaces";
import { IGetYoutubeStatisticsByInfluencerIdWithVerificationCode } from "./dto";

export async function getYoutubeStatisticsByInfluencerIdWithVerificationCode(
  getYoutubeStatisticsByInfluencerIdWithVerificationCodeDto: IGetYoutubeStatisticsByInfluencerIdWithVerificationCode
) {
  const { influencerId, verificationCode, ...requestBodyDto } =
    getYoutubeStatisticsByInfluencerIdWithVerificationCodeDto;
  try {
    const { data } = await baseClient.post<
      IBaseResponseDto<IYoutubeLocalStatistics>,
      AxiosResponse<IBaseResponseDto<IYoutubeLocalStatistics>, typeof requestBodyDto>,
      typeof requestBodyDto
    >(
      `/youtube/${influencerId}/unauthorized/statistic/${verificationCode}`,
      requestBodyDto
    );
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}

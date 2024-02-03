import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { ITikTokLocalStatistics } from "../lib/interfaces";
import { IGetTikTokStatisticsByInfluencerIdWithVerificationCode } from "./dto";

export async function getTikTokStatisticsByInfluencerIdWithVerificationCode(
  getTikTokStatisticsByInfluencerIdWithVerificationCodeDto: IGetTikTokStatisticsByInfluencerIdWithVerificationCode
) {
  const { influencerId, verificationCode } =
    getTikTokStatisticsByInfluencerIdWithVerificationCodeDto;
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<ITikTokLocalStatistics>,
      AxiosResponse<IBaseResponseDto<ITikTokLocalStatistics>, void>,
      void
    >(`/tiktok/${influencerId}/unauthorized/statistic/${verificationCode}`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}

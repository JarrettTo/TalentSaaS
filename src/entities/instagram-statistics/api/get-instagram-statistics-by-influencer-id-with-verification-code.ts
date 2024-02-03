import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IInstagramLocalStatistics } from "../lib/interfaces";
import { IGetInstagramStatisticsByInfluencerIdWithVerificationCode } from "./dto";

export async function getInstagramStatisticsByInfluencerIdWithVerificationCode(
  getInstagramStatisticsByInfluencerIdWithVerificationCodeDto: IGetInstagramStatisticsByInfluencerIdWithVerificationCode
) {
  const { influencerId, verificationCode } =
    getInstagramStatisticsByInfluencerIdWithVerificationCodeDto;
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IInstagramLocalStatistics>,
      AxiosResponse<IBaseResponseDto<IInstagramLocalStatistics>, void>,
      void
    >(`/instagram/${influencerId}/unauthorized/${verificationCode}`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}

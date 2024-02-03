import { baseClient } from "@shared/api";
import { ITikTokBusinessSignInDto } from "./dto";
import { AxiosResponse } from "axios";

export async function tikTokBusinessSignIn(
  tikTokBusinessSignInDto: ITikTokBusinessSignInDto
) {
  try {
    await baseClient.post<
      void,
      AxiosResponse<void, ITikTokBusinessSignInDto>,
      ITikTokBusinessSignInDto
    >("/tiktok-business/sign-in", tikTokBusinessSignInDto);
  } catch (error: any) {
    console.error("tik tok business sign in error:", error);
    throw error;
  }
}

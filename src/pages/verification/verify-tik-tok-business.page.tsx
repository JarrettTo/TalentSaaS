import { useTikTokBusinessSignInMutation } from "@entities/tik-tok-business-statistics";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyTikTokBusinessPage = () => {
  const navigate = useNavigate();
  const location = useLocation().search;
  const { mutateAsync: tikTokBusinessSignIn } = useTikTokBusinessSignInMutation();

  const verifyTikTokBusiness = async () => {
    const verifyCodeAndScope = location.split("?code=")[1];
    const verifyCode = verifyCodeAndScope?.split("&scopes=")[0];
    const scopeString = verifyCodeAndScope?.split("&scopes=")[1]?.split("&state")[0];
    const scopeArray = scopeString?.split("%2C");

    try {
      if (!verifyCode || !scopeArray) {
        throw new Error("missing code or scopes");
      }
      await tikTokBusinessSignIn({
        code: verifyCode,
        scopes: scopeArray,
      });
      toast.success("You have successfully connected TikTok Business account");
    } catch (error: any) {
      console.log("tik tok business sign in error", error);
      toast.error(
        error.response.data.errorMessage || "Error on connecting TikTok Business account"
      );
    }
    navigate("/app/roster");
  };

  useEffect(() => {
    verifyTikTokBusiness();
  }, []);

  return <div></div>;
};

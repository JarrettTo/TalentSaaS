import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const VerifyTikTokPage = () => {
  const navigate = useNavigate();
  const location = useLocation().search;

  const verifyTikTok = async () => {
    let influencerID = location.split("&state=")[1];

    const verifyCodeAndScope = location.split("?code=")[1];
    let verifyCode = verifyCodeAndScope?.split("&scopes=")[0];
    let scopeString = verifyCodeAndScope?.split("&scopes=")[1];
    scopeString = scopeString?.split("&state")[0];
    let scopeArray = scopeString?.split("%2C");

    console.log("v3.0");
    console.log("location:", location);
    console.log("accessToken:", verifyCode);
    console.log("scopes:", scopeArray);

    try {
      const response = await axios.post(`${BASE_URL}/tiktok-business/${influencerID}/sign-in`, {
        code: verifyCode,
        scopes: scopeArray,
      });
      console.log("response", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("You have successfully connected TikTok account");
        const response = await axios.post(`${BASE_URL}/tiktok-business/${influencerID}/prof-pic`);
        console.log("response2", response);
      }
      
    } catch (error: any) {
      //console.log('error', error);
      toast.error(
        error.response.data.errorMessage || "Error on connecting TikTok account"
      );
    }

    navigate("/app/roster");
  };

  useEffect(() => {
    verifyTikTok();
  }, []);

  return <div></div>;
};

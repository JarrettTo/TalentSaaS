import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const VerifyYoutubePage = () => {
  const navigate = useNavigate();
  const location = useLocation().search;

  const verifyYoutube = async () => {
    let influencerID = location.split("&code")[0];
    influencerID = influencerID?.split("influencerId%3D")[1];

    const verifyCodeAndScope = location.split("&code=")[1];
    let verifyCode = verifyCodeAndScope?.split("&scope=")[0];
    let scopeString = verifyCodeAndScope?.split("&scope=")[1];
    let scopeArray = scopeString?.split("%20");
    console.log(scopeArray);

    try {
      const response = await axios.post(`${BASE_URL}/youtube/${influencerID}/sign-in`, {
        verifyCode: verifyCode,
        scopes: scopeArray,
      });
      // console.log('response', response);

      if (response.status === 200 || response.status === 201) {
        toast.success("You have successfully connected Youtube account");
      }
    } catch (error: any) {
      //console.log('error', error);
      toast.error(error.response.data.errorMessage);
    }

    navigate("/app/roster");
  };

  useEffect(() => {
    verifyYoutube();
  }, []);

  return <div></div>;
};

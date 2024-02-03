import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const VerifyInstagramPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const verifyInstagram = async () => {
    console.log("hash", location.hash);
    const verifyCode = location.hash.slice(14, location.hash.length);
    const accessToken = verifyCode.split("&")[0];
    let stamp = verifyCode.split("&state=")[1];
    try {
      const response = await axios.get(
        `${BASE_URL}/facebook/register?accessToken=${accessToken}&stamp=${stamp}`
      );
      // console.log('response', response);
      if (response.status === 200) {
        toast.success("You have successfully connected Instagram account");
      }
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.response.data.errorMessage);
    }

    navigate("/app/roster");
  };

  useEffect(() => {
    verifyInstagram();
  }, []);

  return <div></div>;
};

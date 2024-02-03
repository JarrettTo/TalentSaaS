import authApi from "@features/auth/api/auth.api";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const VerifyEmailPage = () => {
  const { verificationCode } = useParams();
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      await authApi.post("auth/check-confirm-token", {
        token: verificationCode,
      });
      navigate("/login");
      toast.success("You have successfully confirmed your email. Welcome to Jnr!", {
        autoClose: false,
      });
    } catch (error) {
      console.log("Error in verification email", error);
      const value = localStorage.getItem("user");
      if (value) {
        navigate("/app");
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return <div></div>;
};

import authApi from "@features/auth/api/auth.api";
import { toast } from "react-toastify";

export const tryConnectToYoutube = async (influencerID: number) => {
  try {
    const response = await authApi.get(`/youtube/${influencerID}/auth-link`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryConnectToInstagram = async (influencerID: number) => {
  try {
    const response = await authApi.get(`/facebook/link/${influencerID}`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryConnectToTikTok = async (influencerID: number) => {
  try {
    const response = await authApi.get(`/tiktok-business/${influencerID}/auth-link/`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryDisconnectYoutube = async (influencerID: number) => {
  try {
    const response = await authApi.delete(`/youtube/${influencerID}/delete-token`);
    toast.success("YouTube account has been successfully disconnected");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryDisconnectTiktok = async (influencerID: number) => {
  try {
    const response = await authApi.delete(`/tiktok/${influencerID}/delete-token`);
    toast.success("TikTok account has been successfully disconnected");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryDisconnectInstagram = async (influencerID: number) => {
  try {
    const response = await authApi.delete(`/facebook/${influencerID}/disconnect`);
    toast.success("Instagram account has been successfully disconnected");
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

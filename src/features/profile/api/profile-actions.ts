import authApi from "@features/auth/api/auth.api";
import { toast } from "react-toastify";

export const tryDeleteAccount = async (influencerID: number) => {
  try {
    const response = await authApi.delete(`/influencer/${influencerID}/`);
    //@ts-ignore
    if (response.statusCode === 200) {
      return response.data;
    } else {
      toast.error(response.data.error);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryChangeArchiving = async (influencerID: number) => {
  try {
    const response = await authApi.get(
      `/influencer/${influencerID}/-change-archiving`
    );
    //@ts-ignore
    if (response.statusCode === 200) {
      return response.data;
    } else {
      toast.error(response.data.error);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const tryShareAccount = async (influencerID: number) => {
  try {
    const response = await authApi.post(
      `/influencer/${influencerID}/statistic-verify-code/generate`
    );
    //@ts-ignore
    if (response.statusCode === 201) {
      return response.data;
    } else {
      toast.error(response.data.error);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

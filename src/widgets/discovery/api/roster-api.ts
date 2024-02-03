import authApi from "@features/auth/api/auth.api";
import axios from "axios";
import { SortOrder } from "./generate-query-params";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllIActiveInfluencers = async (
  nameOrder?: SortOrder,
  stateOrder?: SortOrder,
  contractStartOrder?: SortOrder,
  contractEndOrder?: SortOrder
) => {
  try {
    const queryParams: Record<string, string> = {
      "order[group][name]": "ASC",
    };
    if (nameOrder) {
      queryParams["order[influencer][firstname]"] = nameOrder;
    } else if (stateOrder) {
      queryParams["order[influencer][state]"] = stateOrder;
    } else if (contractStartOrder) {
      queryParams["order[influencer][contractStartDate]"] = contractStartOrder;
    } else if (contractEndOrder) {
      queryParams["order[influencer][contractEndDate]"] = contractEndOrder;
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await authApi.get(`/influencer/all-active?${queryString}`);
    return response;
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
};

export const getAllIArchivedInfluencers = async () => {
  try {
    const response = await authApi.get("/influencer/all-archived");
    return response;
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
};

export const getStatistic = async (sharedCode?: string) => {
  try {
    let response;

    if (sharedCode) {
      response = await axios.get(
        `${BASE_URL}/total-statistic/statistic/unauthorized/${sharedCode}`
      );
    } else {
      response = await authApi.get("/total-statistic/statistic");
    }

    return response;
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
};

export const getOneInfluencer = async (id: string) => {
  try {
    const response = await authApi.get(`/influencer/${id}`);
    return response;
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
};
export const getOneStrategy = async (id: string) => {
  try {
    const response = await authApi.get(`/influencer/strategy/${id}`);
    return response;
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
};
export const getAllStrategies = async (id: string) => {
  try {
    const response = await authApi.get(`/influencer/strategy/all/${id}`);
    return response;
  } catch (error: any) {
    console.log("error", error);
    return error;
  }
};
export const getInfluencerGroups = async () => {
  try {
    const response = await authApi.get("/influencer/groups");
    return response.data;
  } catch (error) {
    return error;
  }
};

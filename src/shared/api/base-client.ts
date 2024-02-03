import axios from "axios";
import { BASE_URL } from "@shared/lib/constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user != null) {
    const accessToken = JSON.parse(user).accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const user = localStorage.getItem("user");
      if (user != null || user != undefined) {
        const refreshToken = JSON.parse(user).refreshToken;
        if (!refreshToken) {
          return;
        }
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken,
        });
        localStorage.setItem("user", JSON.stringify(response.data.data));
        return instance.request(originalRequest);
      }
    } catch (error) {
      localStorage.removeItem("user");
      console.error(error);
      window.location.href = "/login";
    }
  }
  throw error;
});

export { instance as baseClient };

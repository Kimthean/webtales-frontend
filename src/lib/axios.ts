import axios from "axios";
import { API_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getAuthenticatedApi = async () => {
  const session = await fetch("/api/auth/session").then(res => res.json());

  console.log("session", session);
  if (session?.user?.token) {
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${session.user.token}`;
  }

  return axiosInstance;
};

export default axiosInstance;

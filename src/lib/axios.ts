import axios from "axios";
import { API_URL, BASE_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const getSession = await fetch(`${BASE_URL}/api/auth/session`);
const session = await getSession.json();

axiosInstance.interceptors.request.use(
  config => {
    if (typeof window !== "undefined") {
      const token = session.user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

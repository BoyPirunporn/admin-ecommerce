import { getSession } from "@/app/auth";
import axios, { AxiosError } from "axios";

const DEBUG = process.env.NODE_ENV === "development";

export const axiosServer = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "x-api-key": process.env.X_API_KEY
  },
});


axiosServer.interceptors.request.use(
  async (config) => {
    if (!config.headers['Authorization']) {
      const session = await getSession();
      config.headers['Authorization'] = `Bearer ${session?.accessToken}`;
    }
    return config;
  },
  (error) => {
    if (DEBUG) {
      console.log({ ERROR_AXIOS: error });
    }
    // จัดการกับข้อผิดพลาดก่อนส่ง request
    return Promise.reject(error);
  }
);

axiosServer.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if(DEBUG){
      console.log({ ERROR_AXIOS: error });
    }
    return Promise.reject(error);
    // จัดการกับข้อผิดพลาดหลังจากส่ง request
  }
);
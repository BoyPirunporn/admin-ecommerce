import { getSession } from "@/app/api/[...nextauth]/auth";
import axios from "axios";

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
      // จัดการกับข้อผิดพลาดก่อนส่ง request
      return Promise.reject(error);
    }
  );
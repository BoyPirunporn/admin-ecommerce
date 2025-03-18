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

const controllerMap = new Map<string, AbortController>();

axiosServer.interceptors.request.use(
  async (config) => {
    const url = config.url || ""; // ใช้ URL เป็น key

    // ถ้ามี request ซ้ำ ให้ยกเลิกตัวเก่า
    if (controllerMap.has(url)) {
      controllerMap.get(url)?.abort();
    }

    // สร้าง controller ใหม่
    const controller = new AbortController();
    controllerMap.set(url, controller);

    if (!config.headers["Authorization"]) {
      const session = await getSession();
      config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
    }

    config.signal = controller.signal; // ส่ง signal ไปกับ request

    return config;
  },
  (error) => {
    // จัดการกับข้อผิดพลาดก่อนส่ง request
    return Promise.reject(error);
  }
);

axiosServer.interceptors.response.use(
  async (response) => {
    // ลบ controller ออกจาก Map เมื่อ request สำเร็จ
    controllerMap.delete(response.config.url || "");
    return response;
  },
  async (error: AxiosError) => {
    if (axios.isCancel(error)) {
      console.log("Request was cancelled:", error.message);
    }
    return Promise.reject(error);
  }
);
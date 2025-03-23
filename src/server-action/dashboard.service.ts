'use server'

import { API_DASHBOARD } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Dashboard, ResponseWithPayload } from "@/typed";

export const getDashboardData = async ():Promise<Dashboard> => {
    const response = await axiosServer.get<ResponseWithPayload<Dashboard>>(API_DASHBOARD);
    return response.data.payload;
}
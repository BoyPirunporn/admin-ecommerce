'use server';

import { ORDER } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Order, ResponseWithPayload } from "@/typed";

export const getAllOrder = async (page: number, size: number): Promise<Order[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Order[]>>(`${ORDER}?page=${page}&size=${size}`);
        return response.data.payload;
    } catch (error) {
        console.log(error)
        return [];
    }
};
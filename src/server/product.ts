import { PRODUCT } from "@/constants";
import { axiosServer } from "@/lib/axios-server";

export const getAllProduct = async (page: number, size: number): Promise<Product[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Product[]>>(`${PRODUCT}?page=${page}&size=${size}`);
        return response.data.payload;
    } catch (error) {
        return [];
    }
}
'use server';

import { PRODUCT_OPTION } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { ProductOption, ResponseWithPayload, ResponseMessage } from "@/typed";

export const getProductOptionById = async (id: number): Promise<ProductOption | undefined> => {
    try {
        const result = await axiosServer.get<ResponseWithPayload<ProductOption>>(PRODUCT_OPTION + `/${id}`);
        console.log(result.data.payload);
        return result.data.payload;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const getAllProductOption = async (): Promise<ProductOption[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<ProductOption[]>>(`${PRODUCT_OPTION}?page=0&size=10`);
        return response.data.payload;
    } catch (error) {
        console.log(error);
        return [];
    }
};


export const createProductOption = async (data: ProductOption): Promise<string> => {
    const response = await axiosServer.post<ResponseMessage>(PRODUCT_OPTION, data);
    return response.data.message;
};

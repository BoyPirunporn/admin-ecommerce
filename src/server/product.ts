'use server'
import { getSession } from "@/app/auth";
import { PRODUCT } from "@/constants";
import { axiosServer } from "@/lib/axios-server";


export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        console.log({id})
        const response = await axiosServer.get<ResponseWithPayload<Product>>(`${PRODUCT}/${Number(id)}`);
        return response.data.payload;
    } catch (error) {
        return null;
    }
}
export const getAllProduct = async (page: number, size: number): Promise<Product[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Product[]>>(`${PRODUCT}?page=${page}&size=${size}`);
        return response.data.payload;
    } catch (error) {
        return [];
    }
};

export const createProduct = async (formData: FormData): Promise<string> => {
    await axiosServer.post(PRODUCT, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return "Product has been created.";
};


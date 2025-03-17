'use server';
import { PRODUCT } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Product, ResponseWithPayload } from "@/typed";
import axios from "axios";


export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Product>>(`${PRODUCT}/${Number(id)}`);
        return response.data.payload;
    } catch (error) {
        return null;
    }
};
export const getAllProduct = async (page: number, size: number): Promise<Product[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Product[]>>(`${PRODUCT}?page=${page}&size=${size}`);
        return response.data.payload;
    } catch (error) {
        return [];
    }
};

export const createProduct = async (formData: FormData): Promise<{ message: string; }> => {
    try {
        await axiosServer.post(PRODUCT, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return {
            message: "Product has been created successfully"
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(error.response.data)
            }
        }

        return {
            message: "Internal server error"
        };
    }
};

export const updateProduct = async (formData: FormData): Promise<{ message: string; }> => {
    await axiosServer.put(PRODUCT, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return {
        message: "Product has been updated successfully"
    };
};




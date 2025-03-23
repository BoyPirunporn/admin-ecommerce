'use server';
import { API_PRODUCT } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Product, ResponseWithDataTable, ResponseWithPayload } from "@/typed";
import axios from "axios";


export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Product>>(`${API_PRODUCT}/${Number(id)}`);
        return response.data.payload;
    } catch (error) {
        return null;
    }
};
export const getAllProduct = async (page: number, size: number): Promise<ResponseWithDataTable<Product>> => {
    const response = await axiosServer.get<ResponseWithDataTable<Product>>(`${API_PRODUCT}?page=${page}&size=${size}`);
    return response.data;
};

export const createProduct = async (formData: FormData): Promise<{ message: string; }> => {
    try {
        await axiosServer.post(API_PRODUCT, formData, {
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
    await axiosServer.put(API_PRODUCT, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return {
        message: "Product has been updated successfully"
    };
};




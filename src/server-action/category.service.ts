'use server';

import { CATEGORY } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Category, ResponseWithPayload } from "@/typed";

export const getCategoryById = async (id: number): Promise<Category | null> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Category>>(`${CATEGORY}/${id}`);
        return response.data.payload;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getAllCategory = async (): Promise<Category[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Category[]>>(`${CATEGORY}?page=0&size=10`);
        return response.data.payload;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const createCategory = async (formData: FormData): Promise<string> => {
    try {
        await axiosServer.post(CATEGORY, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return "Category has been created successfully";
    } catch (error) {
        console.log(error)
        throw error;
    }
};
export const updateCategory = async (formData: FormData): Promise<string> => {
    try {
        await axiosServer.put(CATEGORY, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return "Category has been updated successfully";
    } catch (error) {
        console.log(error)
        throw error;
    }
};
export const deleteCategoryById = async (id: number) => { };
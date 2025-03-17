'use server';

import { CATEGORY } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Category, ResponseWithPayload } from "@/typed";

export const getCategoryByName = async (): Promise<Category | null> => {
    return null;
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
       const response =  await axiosServer.post(CATEGORY, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(response.data)
        return "Category has been created successfully";
    } catch (error) {
        console.log(error)
        throw error;
    }
};
export const deleteCategoryById = async (id: number) => { };
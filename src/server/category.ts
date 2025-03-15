'use server'

import { getSession } from "@/app/auth";
import { CATEGORY } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Category, ResponseWithPayload, ResponseMessage } from "@/typed";

export const getCategoryByName = async (): Promise<Category | null> => {
    return null;
}
export const getAllCategory = async (): Promise<Category[]> => {
    try {
        const response = await axiosServer.get<ResponseWithPayload<Category[]>>(`${CATEGORY}?page=0&size=10`);
        return response.data.payload;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export const createCategory = async (category: Category): Promise<string> => {
    try {
        const response = await axiosServer.post<ResponseMessage>(CATEGORY, category);
        return response.data.message;
    } catch (error) {
       throw error;
    }
}
export const deleteCategoryById = async (id: number) => { }
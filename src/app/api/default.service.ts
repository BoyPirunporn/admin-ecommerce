import { axiosServer } from "@/lib/axios-server";
import { ResponseWithDataTable } from "@/typed";

export const getDataTable = async <T,>(url: string): Promise<ResponseWithDataTable<T>> => {
    console.log({ url })
    const response = await axiosServer.get<ResponseWithDataTable<T>>(url);
    console.log(response.data)
    return response.data;
}
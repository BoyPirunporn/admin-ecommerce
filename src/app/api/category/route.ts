import { CATEGORY } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Category, ResponseWithDataTable } from "@/typed";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const page = Number(request.nextUrl.searchParams.get("page") ?? 0);
        const size = Number(request.nextUrl.searchParams.get("size") ?? 10);
        console.log({
            page,
            size
        })
        const response = await axiosServer.get<ResponseWithDataTable<Category>>(CATEGORY, {
            params: {
                page: page,
                size: size
            }
        });
        return NextResponse.json(response.data, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "error",
            payload: []
        })
    }
}
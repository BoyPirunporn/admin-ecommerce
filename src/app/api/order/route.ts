import { API_ORDER, } from "@/constants";
import { axiosServer } from "@/lib/axios-server";
import { Order, ResponseWithDataTable } from "@/typed";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const page = Number(request.nextUrl.searchParams.get("page") ?? 0);
        const size = Number(request.nextUrl.searchParams.get("size") ?? 10);
        const sort = request.nextUrl.searchParams.get("sort") ?? null;
        const orderBy = request.nextUrl.searchParams.get("orderBy") ?? null;

        const response = await axiosServer.get<ResponseWithDataTable<Order>>(API_ORDER, {
            params: {
                page,
                size,
                sort,
                orderBy
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
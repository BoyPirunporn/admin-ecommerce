'use server';

import { AUTH_API } from "@/constants";
import { axiosServer } from "@/lib/axios-server";

export const register = async (email: string, password: string) => {
    await axiosServer.post(`${AUTH_API}/sign-up`, {
        email,
        password,
        roles: [
            "ADMIN"
        ]
    });
}
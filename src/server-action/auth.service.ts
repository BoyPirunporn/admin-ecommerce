'use server';

import { API_AUTH } from "@/constants";
import { axiosServer } from "@/lib/axios-server";

export const register = async (email: string, password: string) => {
    await axiosServer.post(`${API_AUTH}/sign-up`, {
        email,
        password,
        roles: [
            "ADMIN"
        ]
    });
}
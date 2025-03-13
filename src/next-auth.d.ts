import { DefaultSession } from "next-auth";
import { JWT } from 'next-auth';

declare module 'next-auth'{
    interface User {
        accessToken?: string;
        refreshToken?: string;
    }

    interface Session {
        user: Omit<User, "id"> | null;
        accessToken?: string;
        refreshToken?: string;
        // accessTokenExpires?: string;
        error?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        exp?: number;
        lat?: number;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: string;
        error?:string;
    }
}
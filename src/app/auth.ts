import { AuthOptions, getServerSession, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { axiosServer } from '@/lib/axios-server';

const authOptions: AuthOptions = ({
    pages: {
        signIn: "/auth?sign-in",
        signOut: "/auth?sign-in"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
            try {
                if (!token || typeof token !== "object") return {} as Session;
                const sanitizedToken = Object.keys(token).reduce((p, c) => {
                    if (
                        c !== "lat" &&
                        c !== "exp" &&
                        c !== "jti" &&
                        c !== "accessToken" &&
                        c !== "refreshToken"
                    ) {
                        return { ...p, [c]: token[c] };
                    } else {
                        return p;
                    }
                }, {});

                return { ...session, error: token.error, expires: new Date(parseJwt(token.accessToken!).exp * 1000).toISOString(), ...sanitizedToken, accessToken: token.accessToken, refreshToken: token.refreshToken };
            } catch (error) {
                console.log(error);
                return {} as Session;
            }
        },
        jwt: async ({ token, user }) => {
            try {
                if (user) {
                    return {
                        ...user,
                        accessToken: user.accessToken || "",
                        refreshToken: user.refreshToken || "",
                    };
                }
                if (token && token.accessToken && Date.now() / 1000 < parseJwt(token.accessToken).exp) {
                    return token;
                } else if (token && token.refreshToken && Date.now() / 1000 < parseJwt(token.refreshToken).exp) {
                    return await refreshToken(token);
                }
                return {}; // Always return an object, never null
            } catch (error) {
                console.error("[JWT Callback Error]:", error);
                return {}; // Return empty object instead of null
            }
        },
        
    },
    session: {
        strategy: "jwt",
        maxAge: Number(process.env.SESSION_TIMEOUT) ?? 900,
        updateAge: Number(process.env.SESSION_TIMEOUT) ?? 900,
    },
    providers: [
        CredentialsProvider({
            id: "spring-credential",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credential, req) => {
                try {
                    const { data } = await axiosServer.post<{
                        payload: {
                            token: string;
                            refreshToken: string;
                        };
                    }>("/auth/sign-in", {
                        email: credential?.email,
                        password: credential?.password
                    });
                    if (data) {
                        const { payload } = data;
                        const decode = parseJwt(payload.token);
                        return { accessToken: payload.token, refreshToken: payload.refreshToken, user: { email: decode.sub } } as any; // คืนค่าผู้ใช้ที่ได้รับการยืนยัน
                    } else {
                        return null; // ผู้ใช้ไม่ถูกต้อง
                    }
                } catch (error) {
                    console.log;
                    if (axios.isAxiosError(error)) {
                        throw new Error(error.response?.data?.message || error.message || "Internal Server Error");
                    } else {
                        console.log({ errorException: error });
                        throw error;
                    }

                }
            }
        })
    ],

});

export const parseJwt = (token: string) => {
    try {
        // atob: decodes base64 strings
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};
export const getIsTokenValid = (token: string) => {
    if (!token) return false;

    //In JavaScript, a time stamp is the number of milliseconds that have passed since January 1, 1970.

    const jwtExpireTimestamp = parseJwt(token).exp;
    //In this case, since the exp value is in seconds format, we need to convert it to milliseconds format in the next step. 

    const jwtExpireDateTime = new Date(jwtExpireTimestamp * 1000);
    //Now we have expiration date of the token 

    if (jwtExpireDateTime < new Date()) {
        console.log("API token expired");
        return false;
    }

    return true;
};

export const refreshToken = async (token: any) => {
    console.log("REFRESH TOKEN");
    try {
        const { data } = await axios.post<{
            payload: {
                token: string;
                refreshToken: string;
            };
        }>(process.env.API_URL + "/auth/refresh-token", {
            refreshToken: token.refreshToken,
        });
        console.log(data);
        return {
            ...token,
            accessToken: data.payload.token,
            refreshToken: data.payload.refreshToken ?? token.refreshToken
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError"
        };
    }
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
import { baseApi } from "shared/api/rtkApi";
import { LoginSchema } from "../types/loginSchema";
import { UserData } from "../types/authSchema";

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserData, LoginSchema>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;

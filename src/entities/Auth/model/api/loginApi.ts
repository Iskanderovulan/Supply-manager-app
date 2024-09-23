import { authApi } from "shared/api/authApi";
import { LoginSchema } from "../types/loginSchema";
import { UserData } from "../types/authSchema";
import { API_ENDPOINTS } from "shared/config/apiConfig/apiConfig";

export const loginApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserData, LoginSchema>({
            query: (credentials) => ({
                url: API_ENDPOINTS.LOGIN,
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;

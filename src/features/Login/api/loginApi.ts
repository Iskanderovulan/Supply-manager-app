import { authApi } from "@shared/api/authApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { UserData } from "@entities/Auth/model/types/authSchema";
import { LoginSchema } from "../model/loginSchema";

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

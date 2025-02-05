import { authApi } from "@shared/api/authApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { UserData } from "@entities/Auth/model/types/authSchema";
import { RegisterSchema } from "../model/registerSchema";

export const registerApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<UserData, Partial<RegisterSchema>>({
            query: (data) => ({
                url: API_ENDPOINTS.REGISTER,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation } = registerApi;

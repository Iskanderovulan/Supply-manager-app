import { authApi } from "@shared/api/authApi";
import { RegisterSchema } from "../model/types/registerSchema";
import { UserData } from "@entities/Auth/model/types/authSchema";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

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

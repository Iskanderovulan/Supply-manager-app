import { baseApi } from "shared/api/rtkApi";
import { RegisterSchema } from "../types/registerSchema";
import { UserData } from "../types/authSchema";

export const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<UserData, RegisterSchema>({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation } = registerApi;

import { baseApi } from "@shared/api/rtkApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const changePasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation<void, { oldPassword: string; newPassword: string }>({
            query: (passwords) => ({
                url: `${API_ENDPOINTS.USERS}/change-password`,
                method: "POST",
                body: passwords,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useChangePasswordMutation } = changePasswordApi;

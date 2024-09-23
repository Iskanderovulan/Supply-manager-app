import { authApi } from "shared/api/authApi";
import { API_ENDPOINTS } from "shared/config/apiConfig/apiConfig";

export const logoutApi = authApi.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, { refreshToken: string }>({
            query: ({ refreshToken }) => ({
                url: API_ENDPOINTS.LOGOUT,
                method: "POST",
                body: { refreshToken },
            }),
        }),
    }),
});

export const { useLogoutMutation } = logoutApi;

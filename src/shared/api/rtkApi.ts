import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store/store";
import { authActions } from "entities/Auth";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { Tokens, User } from "shared/types/auth";
// Базовый запрос с учетом обновления токена
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5050/v1/",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;

        const refreshResult = await baseQuery(
            {
                url: "/auth/refresh-tokens",
                method: "POST",
                body: { refreshToken },
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            api.dispatch(
                authActions.setCredentials(refreshResult.data as { tokens: Tokens; user: User }),
            );
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(authActions.clearToken());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Materials"],
    endpoints: () => ({}),
});

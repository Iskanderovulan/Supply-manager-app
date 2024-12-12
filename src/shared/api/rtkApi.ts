import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "@app/store/store";
import { authActions } from "@entities/Auth";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { Tokens } from "@shared/types/auth";
import { TagTypes } from "@shared/const/tagTypes";
import { BASE_URL, API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
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

        if (refreshToken) {
            const refreshResult = await baseQuery(
                {
                    url: API_ENDPOINTS.REFRESH_TOKEN,
                    method: "POST",
                    body: { refreshToken },
                },
                api,
                extraOptions,
            );

            if (refreshResult.data) {
                const tokens = refreshResult.data as Tokens;

                api.dispatch(
                    authActions.setCredentials({
                        tokens,
                    }),
                );

                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(baseApi.util.resetApiState());
                api.dispatch(authActions.clearToken());
            }
        } else {
            api.dispatch(baseApi.util.resetApiState());
            api.dispatch(authActions.clearToken());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        TagTypes.MATERIALS,
        TagTypes.COLORS,
        TagTypes.PACKS,
        TagTypes.PRODUCTS,
        TagTypes.USERS,
    ],
    endpoints: () => ({}),
});

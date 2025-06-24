import { baseApi } from "@shared/api/rtkApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { TagTypes } from "@shared/const/tagTypes";
import { UserSchema } from "../model/userSchema";

export const getUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserSchema, void>({
            query: () => ({
                url: `${API_ENDPOINTS.USERS}/me`,
                method: "GET",
            }),
            providesTags: (result, error) =>
                result
                    ? [{ type: TagTypes.USERS, id: result.id }]
                    : error
                    ? [{ type: TagTypes.USERS, id: TagTypes.LIST }]
                    : [],
        }),
    }),
    overrideExisting: false,
});

export const { useGetUserQuery } = getUserApi;

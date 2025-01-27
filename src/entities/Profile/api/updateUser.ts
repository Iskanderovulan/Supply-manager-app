import { baseApi } from "@shared/api/rtkApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { TagTypes } from "@shared/const/tagTypes";
import { UserSchema } from "../model/types/userSchema";

export const updateUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation<UserSchema, Partial<UserSchema> & { userId: string }>({
            query: ({ userId, ...userData }) => ({
                url: `${API_ENDPOINTS.USERS}/${userId}`,
                method: "PATCH",
                body: userData,
            }),
            invalidatesTags: (result, error, { userId }) =>
                result
                    ? [{ type: TagTypes.USERS, id: userId }]
                    : error
                    ? [{ type: TagTypes.USERS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.USERS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateUserMutation } = updateUserApi;

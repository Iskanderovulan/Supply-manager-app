import { baseApi } from "@shared/api/rtkApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { TagTypes } from "@shared/const/tagTypes";

export const deleteUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteUser: builder.mutation<void, string>({
            query: (userId) => ({
                url: `${API_ENDPOINTS.USERS}/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, userId) =>
                result
                    ? [{ type: TagTypes.USERS, id: userId }]
                    : error
                    ? [{ type: TagTypes.USERS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.USERS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeleteUserMutation } = deleteUserApi;

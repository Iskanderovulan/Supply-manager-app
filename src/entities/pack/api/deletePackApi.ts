import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { PackSchema } from "../model/types/packSchema";

export const deletePackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deletePack: builder.mutation<PackSchema, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.PACKS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: TagTypes.PACKS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeletePackMutation } = deletePackApi;

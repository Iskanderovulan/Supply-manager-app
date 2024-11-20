import { baseApi } from "@shared/api/rtkApi";
import { PackSchema } from "../model/types/packSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const updatePackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updatePack: builder.mutation<PackSchema, Partial<PackSchema>>({
            query: ({ id, ...patch }) => ({
                url: `${API_ENDPOINTS.PACKS}/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [{ type: TagTypes.PACKS, id }]
                    : error
                    ? [{ type: TagTypes.PACKS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.PACKS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdatePackMutation } = updatePackApi;

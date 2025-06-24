import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { PackSchema } from "../model/types/packSchema";

export const updatePackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updatePack: builder.mutation<PackSchema, Partial<PackSchema>>({
            query: ({ id, ...patch }) => ({
                url: `${API_ENDPOINTS.PACKS}/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: (result, _, { id }) =>
                result
                    ? [{ type: TagTypes.PACKS, id }]
                    : [{ type: TagTypes.PACKS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdatePackMutation } = updatePackApi;

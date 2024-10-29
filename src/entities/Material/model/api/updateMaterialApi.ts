import { baseApi } from "@shared/api/rtkApi";
import { MaterialSchema } from "../types/materialSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const updateMaterialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateMaterial: builder.mutation<MaterialSchema, Partial<MaterialSchema>>({
            query: ({ id, ...patch }) => ({
                url: `${API_ENDPOINTS.MATERIALS}/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [{ type: TagTypes.MATERIALS, id }]
                    : error
                    ? [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateMaterialMutation } = updateMaterialApi;

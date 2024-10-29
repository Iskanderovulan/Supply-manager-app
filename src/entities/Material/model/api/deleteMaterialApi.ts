import { baseApi } from "@shared/api/rtkApi";
import { MaterialSchema } from "../types/materialSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const deleteMaterialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteMaterial: builder.mutation<MaterialSchema, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.MATERIALS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) =>
                result
                    ? [{ type: TagTypes.MATERIALS, id }]
                    : error
                    ? [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeleteMaterialMutation } = deleteMaterialApi;

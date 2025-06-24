import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { MaterialSchema } from "../model/types/materialSchema";

export const deleteMaterialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteMaterial: builder.mutation<MaterialSchema, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.MATERIALS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeleteMaterialMutation } = deleteMaterialApi;

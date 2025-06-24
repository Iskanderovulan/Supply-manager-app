import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { MaterialSchema } from "../model/types/materialSchema";

export const createMaterialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMaterial: builder.mutation<MaterialSchema, Partial<MaterialSchema>>({
            query: (newMaterial) => ({
                url: API_ENDPOINTS.MATERIALS,
                method: "POST",
                body: newMaterial,
            }),
            invalidatesTags: [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateMaterialMutation } = createMaterialApi;

import { baseApi } from "shared/api/rtkApi";
import { MaterialSchema } from "../types/materialSchema";
import { TagTypes } from "shared/const/tagTypes";
import { API_ENDPOINTS } from "shared/config/apiConfig/apiConfig";

export const materialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<{ results: MaterialSchema[] }, void>({
            query: () => API_ENDPOINTS.MATERIALS,
            providesTags: (result) =>
                result?.results
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: TagTypes.MATERIALS as const,
                              id,
                          })),
                          { type: TagTypes.MATERIALS, id: TagTypes.LIST },
                      ]
                    : [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
        createMaterial: builder.mutation<MaterialSchema, Partial<MaterialSchema>>({
            query: (newMaterial) => ({
                url: API_ENDPOINTS.MATERIALS,
                method: "POST",
                body: newMaterial,
            }),
            invalidatesTags: [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }],
        }),
        updateMaterial: builder.mutation<MaterialSchema, Partial<MaterialSchema>>({
            query: ({ id, ...patch }) => ({
                url: API_ENDPOINTS.MATERIALS,
                method: "PATCH",
                body: patch,
                params: { id },
            }),
            invalidatesTags: (result, error, { id }) => {
                if (result) {
                    return [{ type: TagTypes.MATERIALS, id }];
                } else if (error) {
                    return [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }];
                }
                return [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }];
            },
        }),
        deleteMaterial: builder.mutation<MaterialSchema, string>({
            query: (id) => ({
                url: API_ENDPOINTS.MATERIALS,
                method: "DELETE",
                params: { id },
            }),
            invalidatesTags: (result, error, id) => {
                if (result) {
                    return [{ type: TagTypes.MATERIALS, id }];
                } else if (error) {
                    return [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }];
                }
                return [{ type: TagTypes.MATERIALS, id: TagTypes.LIST }];
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMaterialsQuery,
    useCreateMaterialMutation,
    useUpdateMaterialMutation,
    useDeleteMaterialMutation,
} = materialApi;

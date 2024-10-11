import { baseApi } from "@shared/api/rtkApi";
import { MaterialSchema } from "../types/materialSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const materialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<
            { results: MaterialSchema[]; totalResults: number; totalPages: number },
            {
                page: number;
                limit: number;
                name?: string;
                hardness?: string[];
                createdBefore?: string;
                createdAfter?: string;
            }
        >({
            query: ({ page, limit, name, hardness, createdBefore, createdAfter }) => {
                const config: Record<string, { condition: boolean; value: string | undefined }> = {
                    name: {
                        condition: !!name,
                        value: name,
                    },
                    hardness: {
                        condition: (hardness || [])?.length > 0,
                        value: hardness?.join(","),
                    },
                    createdBefore: {
                        condition: !!createdBefore,
                        value: createdBefore,
                    },
                    createdAfter: {
                        condition: !!createdAfter,
                        value: createdAfter,
                    },
                };

                const params: Record<string, unknown> = { page, limit };

                // Проходим по объекту config и добавляем в params
                Object.keys(config).forEach((key) => {
                    if (config[key].condition) {
                        params[key] = config[key].value;
                    }
                });

                return {
                    url: API_ENDPOINTS.MATERIALS,
                    params,
                };
            },
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
                url: `${API_ENDPOINTS.MATERIALS}/${id}`,
                method: "PATCH",
                body: patch,
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
                url: `${API_ENDPOINTS.MATERIALS}/${id}`,
                method: "DELETE",
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

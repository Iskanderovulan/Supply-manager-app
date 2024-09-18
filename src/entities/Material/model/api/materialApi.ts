import { baseApi } from "shared/api/rtkApi";
import { MaterialSchema } from "../types/materialSchema";

export const materialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<{ results: MaterialSchema[] }, void>({
            query: () => "materials",
            providesTags: (result) =>
                result?.results
                    ? [
                          ...result.results.map(({ id }) => ({ type: "Materials" as const, id })),
                          { type: "Materials", id: "LIST" },
                      ]
                    : [{ type: "Materials", id: "LIST" }],
        }),
        createMaterial: builder.mutation<MaterialSchema, Partial<MaterialSchema>>({
            query: (newMaterial) => ({
                url: "materials",
                method: "POST",
                body: newMaterial,
            }),
            invalidatesTags: [{ type: "Materials", id: "LIST" }],
        }),
        updateMaterial: builder.mutation<MaterialSchema, Partial<MaterialSchema>>({
            query: ({ id, ...patch }) => ({
                url: `materials/${id}`,
                method: "PATCH",
                body: patch,
            }),
            // Обрабатываем результат и ошибку
            invalidatesTags: (result, error, { id }) => {
                if (result) {
                    return [{ type: "Materials", id }];
                } else if (error) {
                    console.error("Ошибка обновления материала:", error);
                    return [{ type: "Materials", id: "LIST" }];
                }
                return [{ type: "Materials", id: "LIST" }];
            },
        }),
        deleteMaterial: builder.mutation<MaterialSchema, string>({
            query: (id) => ({
                url: `materials/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => {
                if (result) {
                    return [{ type: "Materials", id }];
                } else if (error) {
                    console.error("Ошибка удаления материала:", error);
                    return [{ type: "Materials", id: "LIST" }];
                }
                return [{ type: "Materials", id: "LIST" }];
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

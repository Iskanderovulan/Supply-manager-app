import { baseApi } from "@shared/api/rtkApi";
import { ProductSchema } from "../model/types/ProductSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const updateProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateProduct: builder.mutation<ProductSchema, Partial<ProductSchema>>({
            query: ({ id, ...patch }) => ({
                url: `${API_ENDPOINTS.PRODUCTS}/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [{ type: TagTypes.PRODUCTS, id }]
                    : error
                    ? [{ type: TagTypes.PRODUCTS, id: TagTypes.LIST }]
                    : [{ type: TagTypes.PRODUCTS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useUpdateProductMutation } = updateProductApi;

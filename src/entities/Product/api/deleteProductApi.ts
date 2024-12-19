import { baseApi } from "@shared/api/rtkApi";
import { ProductSchema } from "../model/types/ProductSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const deleteProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteProduct: builder.mutation<ProductSchema, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.PRODUCTS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: TagTypes.PRODUCTS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useDeleteProductMutation } = deleteProductApi;

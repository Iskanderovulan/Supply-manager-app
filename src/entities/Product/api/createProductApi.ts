import { baseApi } from "@shared/api/rtkApi";
import { ProductSchema } from "../model/types/ProductSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

export const createProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation<ProductSchema, Partial<ProductSchema>>({
            query: (newProduct) => ({
                url: API_ENDPOINTS.PRODUCTS,
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: [{ type: TagTypes.PRODUCTS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useCreateProductMutation } = createProductApi;

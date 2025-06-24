import { baseApi } from "@shared/api/rtkApi";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { TagTypes } from "@shared/const/tagTypes";
import { ProductSchema } from "@entities/product";

export const detailsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDetails: builder.query<ProductSchema, string>({
            query: (productId) => ({
                url: `${API_ENDPOINTS.PRODUCTS}/${productId}`,
                method: "GET",
            }),
            providesTags: (result, _, productId) =>
                result ? [{ type: TagTypes.PRODUCTS, id: productId }] : [],
        }),
    }),
    overrideExisting: false,
});

export const { useGetDetailsQuery } = detailsApi;

import { baseApi } from "@shared/api/rtkApi";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";
import { GetCommonParams } from "@shared/ui/CommonControl";
import { ProductResponse } from "../model/types/ProductResponse";

interface GetProductsParams extends GetCommonParams {
    materialIds?: string[];
    colorIds?: string[];
    packIds?: string[];
    priceMin?: string;
    priceMax?: string;
    paginated?: boolean;
}

const getProductQueryConfig = ({
    page,
    limit,
    name,
    materialIds,
    colorIds,
    packIds,
    priceMin,
    priceMax,
    sortBy,
    paginated = true,
}: GetProductsParams) => {
    const config: Record<string, { condition: boolean; value: string | undefined }> = {
        name: { condition: !!name, value: name },
        materialIds: { condition: (materialIds || []).length > 0, value: materialIds?.join(",") },
        colorIds: { condition: (colorIds || []).length > 0, value: colorIds?.join(",") },
        packIds: { condition: (packIds || []).length > 0, value: packIds?.join(",") },
        priceMin: {
            condition: priceMin !== "",
            value: priceMin?.toString(),
        },
        priceMax: {
            condition: priceMax !== "",
            value: priceMax?.toString(),
        },
        sortBy: { condition: !!sortBy, value: sortBy },
        paginated: { condition: !paginated, value: "0" },
    };

    const params: Record<string, unknown> = {};

    if (paginated) {
        params.page = page;
        params.limit = limit;
    }

    Object.keys(config).forEach((key) => {
        if (config[key].condition) {
            params[key] = config[key].value;
        }
    });

    return { url: API_ENDPOINTS.PRODUCTS, params };
};

export const getProductsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductResponse, GetProductsParams>({
            query: getProductQueryConfig,
            providesTags: (result) =>
                result?.results
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: TagTypes.PRODUCTS as const,
                              id,
                          })),
                          { type: TagTypes.PRODUCTS, id: TagTypes.LIST },
                      ]
                    : [{ type: TagTypes.PRODUCTS, id: TagTypes.LIST }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetProductsQuery } = getProductsApi;

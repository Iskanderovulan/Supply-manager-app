import { baseApi } from "@shared/api/rtkApi";
import { ProductSchema } from "../model/types/ProductSchema";
import { TagTypes } from "@shared/const/tagTypes";
import { API_ENDPOINTS } from "@shared/config/apiConfig/apiConfig";

// Тип параметров для получения продуктов
type GetProductsParams = {
    page?: number;
    limit?: number;
    name?: string;
    materialIds?: string[]; // Массив ID материалов
    colorIds?: string[]; // Массив ID цветов
    packIds?: string[]; // Массив ID упаковок
    priceMin?: string;
    priceMax?: string;
    createdBefore?: string;
    createdAfter?: string;
    sortBy?: string;
    paginated?: boolean;
};

// Ответ API
type GetProductsResponse = {
    results: ProductSchema[];
    totalResults?: number;
    totalPages?: number;
};

// Конфигурация для запроса
const getProductQueryConfig = ({
    page,
    limit,
    name,
    materialIds,
    colorIds,
    packIds,
    priceMin,
    priceMax,
    createdBefore,
    createdAfter,
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
        createdBefore: { condition: !!createdBefore, value: createdBefore },
        createdAfter: { condition: !!createdAfter, value: createdAfter },
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

// Интеграция API
export const getProductsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, GetProductsParams>({
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

// Хуки для использования API
export const { useGetProductsQuery } = getProductsApi;

import { ProductResponse } from "../types/ProductResponse";

export const useProductData = (products: ProductResponse | undefined) => {
    const totalPages = products?.totalPages || 0;
    const totalResults = products?.totalResults || 0;
    const results = products?.results || [];

    return { totalPages, totalResults, results };
};

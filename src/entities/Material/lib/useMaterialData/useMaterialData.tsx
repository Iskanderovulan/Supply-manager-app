import { MaterialResponse } from "@entities/Material/model/types/materialResponse";

export const useMaterialData = (materials: MaterialResponse | undefined) => {
    const totalPages = materials?.totalPages || 0;
    const totalResults = materials?.totalResults || 0;
    const results = materials?.results || [];

    return { totalPages, totalResults, results };
};

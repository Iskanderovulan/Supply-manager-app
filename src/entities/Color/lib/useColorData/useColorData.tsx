import { ColorResponse } from "@entities/Color/model/types/colorResponse";

export const useColorData = (colors?: ColorResponse) => {
    const totalPages = colors?.totalPages || 0;
    const totalResults = colors?.totalResults || 0;
    const results = colors?.results || [];

    return { totalPages, totalResults, results };
};

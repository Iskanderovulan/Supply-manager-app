import { PackResponse } from "../types/packResponse";

export const usePackData = (packs: PackResponse | undefined) => {
    const totalPages = packs?.totalPages || 0;
    const totalResults = packs?.totalResults || 0;
    const results = packs?.results || [];

    return { totalPages, totalResults, results };
};

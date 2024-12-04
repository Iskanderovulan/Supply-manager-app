export const getUpdatedParams = (
    selectedFilters: Record<string, unknown>,
    filterMapping: Record<string, string>,
): Record<string, string | null | string[]> => {
    const updatedParams: Record<string, string | null | string[]> = { page: null };

    for (const [filterKey, paramKey] of Object.entries(filterMapping)) {
        updatedParams[paramKey] =
            selectedFilters[filterKey] !== undefined
                ? (selectedFilters[filterKey] as string[] | string | null)
                : null;
    }

    return updatedParams;
};

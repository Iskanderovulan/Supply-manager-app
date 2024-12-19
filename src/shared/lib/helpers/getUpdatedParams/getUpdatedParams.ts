type UpdatedParams = Record<string, string | null | string[]>;
type SelectedFilters = string[] | string | null;

export const getUpdatedParams = (
    selectedFilters: Record<string, unknown>,
    filterMapping: Record<string, string>,
): UpdatedParams => {
    const updatedParams: UpdatedParams = { page: null };

    for (const [filterKey, paramKey] of Object.entries(filterMapping)) {
        updatedParams[paramKey] =
            selectedFilters[filterKey] !== undefined
                ? (selectedFilters[filterKey] as SelectedFilters)
                : null;
    }

    return updatedParams;
};

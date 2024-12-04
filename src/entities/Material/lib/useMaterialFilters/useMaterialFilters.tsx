import { useMemo } from "react";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import { FilterKeys } from "@entities/CommonControl";
import { MaterialFiltersSchema } from "../../model/types/materialFiltersSchema";

export const useMaterialFilters = () => {
    const { getSearchParam } = useFilterSearchParams();

    const page = Number(getSearchParam(FilterKeys.PAGE)) || 1;
    const limit = Number(getSearchParam(FilterKeys.LIMIT)) || defaultPageSizeOption;
    const name = getSearchParam(FilterKeys.NAME) || "";
    const sortBy = getSearchParam(FilterKeys.SORT_BY);
    const createdBefore = getSearchParam(FilterKeys.CREATED_BEFORE);
    const createdAfter = getSearchParam(FilterKeys.CREATED_AFTER);
    const hardness = useMemo(
        () => getSearchParam(FilterKeys.HARDNESS, true) || [],
        [getSearchParam],
    );

    const initialFilters = useMemo<MaterialFiltersSchema>(() => {
        return {
            materials: hardness,
            dateRange: createdAfter && createdBefore ? [createdAfter, createdBefore] : null,
        };
    }, [hardness, createdBefore, createdAfter]);

    return {
        page,
        limit,
        name,
        sortBy,
        createdBefore,
        createdAfter,
        hardness,
        initialFilters,
    };
};

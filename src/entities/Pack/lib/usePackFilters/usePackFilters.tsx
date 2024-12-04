import { useMemo } from "react";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import { FilterKeys } from "@entities/CommonControl";
import { PackFiltersSchema } from "@entities/Pack/model/types/packFiltersSchema";

export const usePackFilters = () => {
    const { getSearchParam } = useFilterSearchParams();

    const page = Number(getSearchParam(FilterKeys.PAGE)) || 1;
    const limit = Number(getSearchParam(FilterKeys.LIMIT)) || defaultPageSizeOption;
    const name = getSearchParam(FilterKeys.NAME) || "";
    const sortBy = getSearchParam(FilterKeys.SORT_BY);
    const createdBefore = getSearchParam(FilterKeys.CREATED_BEFORE);
    const createdAfter = getSearchParam(FilterKeys.CREATED_AFTER);
    const type = useMemo(() => getSearchParam(FilterKeys.TYPE, true) || [], [getSearchParam]);

    const initialFilters = useMemo<PackFiltersSchema>(() => {
        return {
            packs: type,
            dateRange: createdAfter && createdBefore ? [createdAfter, createdBefore] : null,
        };
    }, [type, createdBefore, createdAfter]);

    return {
        page,
        limit,
        name,
        sortBy,
        createdBefore,
        createdAfter,
        type,
        initialFilters,
    };
};

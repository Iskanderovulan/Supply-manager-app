import { useMemo } from "react";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import { FilterKeys } from "@shared/ui/CommonControl";
import { ColorFiltersSchema } from "@entities/Color/model/types/colorFiltersSchema";

export const useColorFilters = () => {
    const { getSearchParam } = useFilterSearchParams();

    const page = Number(getSearchParam(FilterKeys.PAGE)) || 1;
    const limit = Number(getSearchParam(FilterKeys.LIMIT)) || defaultPageSizeOption;
    const name = getSearchParam(FilterKeys.NAME) || "";
    const sortBy = getSearchParam(FilterKeys.SORT_BY);
    const intensity = useMemo(
        () => getSearchParam(FilterKeys.INTENSITY, true) || [],
        [getSearchParam],
    );

    const initialFilters = useMemo<ColorFiltersSchema>(() => {
        return {
            colors: intensity,
        };
    }, [intensity]);

    return {
        page,
        limit,
        name,
        sortBy,
        intensity,
        initialFilters,
    };
};

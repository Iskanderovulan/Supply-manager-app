import { useMemo } from "react";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import { FilterKeys } from "@shared/ui/CommonControl";
import { MaterialFiltersSchema } from "../model/materialFiltersSchema";

export const useMaterialFilters = () => {
    const { getSearchParam } = useFilterSearchParams();

    const page = Number(getSearchParam(FilterKeys.PAGE)) || 1;
    const limit = Number(getSearchParam(FilterKeys.LIMIT)) || defaultPageSizeOption;
    const name = getSearchParam(FilterKeys.NAME) || "";
    const sortBy = getSearchParam(FilterKeys.SORT_BY);

    const hardness = useMemo(
        () => getSearchParam(FilterKeys.HARDNESS, true) || [],
        [getSearchParam],
    );

    const initialFilters = useMemo<MaterialFiltersSchema>(() => {
        return {
            materials: hardness,
        };
    }, [hardness]);

    return {
        page,
        limit,
        name,
        sortBy,
        hardness,
        initialFilters,
    };
};

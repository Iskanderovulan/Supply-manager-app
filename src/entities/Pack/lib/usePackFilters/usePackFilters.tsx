import { useMemo } from "react";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import { FilterKeys } from "@shared/ui/CommonControl";
import { PackFiltersSchema } from "@entities/Pack/model/types/packFiltersSchema";

export const usePackFilters = () => {
    const { getSearchParam } = useFilterSearchParams();

    const page = Number(getSearchParam(FilterKeys.PAGE)) || 1;
    const limit = Number(getSearchParam(FilterKeys.LIMIT)) || defaultPageSizeOption;
    const name = getSearchParam(FilterKeys.NAME) || "";
    const sortBy = getSearchParam(FilterKeys.SORT_BY);

    const type = useMemo(() => getSearchParam(FilterKeys.TYPE, true) || [], [getSearchParam]);

    const initialFilters = useMemo<PackFiltersSchema>(() => {
        return {
            packs: type,
        };
    }, [type]);

    return {
        page,
        limit,
        name,
        sortBy,
        type,
        initialFilters,
    };
};

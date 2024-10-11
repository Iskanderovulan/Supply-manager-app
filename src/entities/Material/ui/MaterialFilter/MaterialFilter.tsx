import { FC } from "react";
import { Filter } from "@features/Filter";
import { filterConfig } from "@entities/Material/model/config/filterConfig";
import { UpdateSearchParamsFunc } from "@shared/lib/hooks/useFilterSearchParams";

interface MaterialFilterProps {
    updateSearchParams: UpdateSearchParamsFunc;
}

export const MaterialFilter: FC<MaterialFilterProps> = (props) => {
    const { updateSearchParams } = props;

    const onApply = (selectedFilters: Record<string, string>) => {
        updateSearchParams({
            page: null,
            hardness: selectedFilters.materials || [],
            createdBefore: selectedFilters.createdBefore,
            createdAfter: selectedFilters.createdAfter,
        });
    };

    const onReset = () => {
        updateSearchParams({
            hardness: [],
            createdBefore: null,
            createdAfter: null,
        });
    };

    return <Filter filters={filterConfig} onApply={onApply} onReset={onReset} />;
};

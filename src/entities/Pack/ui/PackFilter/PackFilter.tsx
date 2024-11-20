import { FC } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterPackConfig } from "@entities/Pack/model/config/filterPackConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { PackFiltersSchema } from "@entities/Pack/model/types/packFiltersSchema";

interface PackFilterProps {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: PackFiltersSchema;
}

export const PackFilter: FC<PackFilterProps> = (props) => {
    const { updateSearchParams, initialFilters } = props;
    const { t } = useTranslation(TranslationId.PACK);

    const onApply = (selectedFilters: Record<string, unknown>) => {
        const updatedParams: Record<string, string | null | string[]> = {
            page: null,
        };
        if (selectedFilters.packs) {
            updatedParams.type = selectedFilters.packs as string[];
        }
        if (selectedFilters.createdBefore) {
            updatedParams.createdBefore = selectedFilters.createdBefore as string;
        }
        if (selectedFilters.createdAfter) {
            updatedParams.createdAfter = selectedFilters.createdAfter as string;
        }
        updateSearchParams(updatedParams);
    };

    const onReset = () => {
        updateSearchParams({
            type: [],
            createdBefore: null,
            createdAfter: null,
        });
    };

    return (
        <Filter<PackFiltersSchema>
            filters={filterPackConfig(t)}
            onApply={onApply}
            onReset={onReset}
            initialFilters={initialFilters}
        />
    );
};

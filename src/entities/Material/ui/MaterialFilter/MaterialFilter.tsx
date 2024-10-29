import { FC, useCallback } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterConfig } from "@entities/Material/model/config/filterConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { MaterialFiltersSchema } from "@entities/Material/model/types/materialFiltersSchema";

interface MaterialFilterProps {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: MaterialFiltersSchema;
}

export const MaterialFilter: FC<MaterialFilterProps> = (props) => {
    const { updateSearchParams, initialFilters } = props;
    const { t } = useTranslation(TranslationId.MATERIAL);

    const onApply = useCallback(
        (selectedFilters: Record<string, unknown>) => {
            const updatedParams: Record<string, string | null | string[]> = {
                page: null,
            };
            if (selectedFilters.materials) {
                updatedParams.hardness = selectedFilters.materials as string[];
            }
            if (selectedFilters.createdBefore) {
                updatedParams.createdBefore = selectedFilters.createdBefore as string;
            }
            if (selectedFilters.createdAfter) {
                updatedParams.createdAfter = selectedFilters.createdAfter as string;
            }
            updateSearchParams(updatedParams);
        },
        [updateSearchParams],
    );

    const onReset = useCallback(() => {
        updateSearchParams({
            hardness: [],
            createdBefore: null,
            createdAfter: null,
        });
    }, [updateSearchParams]);

    return (
        <Filter<MaterialFiltersSchema>
            filters={filterConfig(t)}
            onApply={onApply}
            onReset={onReset}
            initialFilters={initialFilters}
        />
    );
};

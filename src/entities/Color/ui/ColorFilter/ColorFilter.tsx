import { FC } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterColorConfig } from "@entities/Color/model/config/filterColorConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ColorFiltersSchema } from "@entities/Color/model/types/colorFiltersSchema";

interface ColorFilterProps {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: ColorFiltersSchema;
}

export const ColorFilter: FC<ColorFilterProps> = (props) => {
    const { updateSearchParams, initialFilters } = props;
    const { t } = useTranslation(TranslationId.COLOR);

    const onApply = (selectedFilters: Record<string, unknown>) => {
        const updatedParams: Record<string, string | null | string[]> = {
            page: null,
        };
        if (selectedFilters.colors) {
            updatedParams.intensity = selectedFilters.colors as string[];
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
            intensity: [],
            createdBefore: null,
            createdAfter: null,
        });
    };

    return (
        <Filter<ColorFiltersSchema>
            filters={filterColorConfig(t)}
            onApply={onApply}
            onReset={onReset}
            initialFilters={initialFilters}
        />
    );
};

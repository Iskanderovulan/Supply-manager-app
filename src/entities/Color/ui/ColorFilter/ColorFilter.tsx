import { FC } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterColorConfig } from "@entities/Color/model/config/filterColorConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ColorFiltersSchema } from "@entities/Color/model/types/colorFiltersSchema";
import { getUpdatedParams } from "@shared/lib/helpers/getUpdatedParams/getUpdatedParams";

interface ColorFilterProps {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: ColorFiltersSchema;
}

export const ColorFilter: FC<ColorFilterProps> = (props) => {
    const { updateSearchParams, initialFilters } = props;
    const { t } = useTranslation(TranslationId.COLOR);

    const onApply = (selectedFilters: Record<string, unknown>) => {
        const filterMapping: Record<string, string> = {
            colors: "intensity",
        };
        const updatedParams = getUpdatedParams(selectedFilters, filterMapping);
        updateSearchParams(updatedParams);
    };

    const onReset = () => {
        updateSearchParams({
            intensity: [],
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

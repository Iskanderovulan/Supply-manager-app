import { FC } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterMaterialConfig } from "@entities/Material/model/config/filterMaterialConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { MaterialFiltersSchema } from "@entities/Material/model/types/materialFiltersSchema";
import { getUpdatedParams } from "@shared/lib/helpers/getUpdatedParams/getUpdatedParams";

interface MaterialFilterProps {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: MaterialFiltersSchema;
}

export const MaterialFilter: FC<MaterialFilterProps> = (props) => {
    const { updateSearchParams, initialFilters } = props;
    const { t } = useTranslation(TranslationId.MATERIAL);

    const onApply = (selectedFilters: Record<string, unknown>) => {
        const filterMapping: Record<string, string> = {
            materials: "hardness",
        };
        const updatedParams = getUpdatedParams(selectedFilters, filterMapping);
        updateSearchParams(updatedParams);
    };

    const onReset = () => {
        updateSearchParams({
            hardness: [],
        });
    };

    return (
        <Filter<MaterialFiltersSchema>
            filters={filterMaterialConfig(t)}
            onApply={onApply}
            onReset={onReset}
            initialFilters={initialFilters}
        />
    );
};

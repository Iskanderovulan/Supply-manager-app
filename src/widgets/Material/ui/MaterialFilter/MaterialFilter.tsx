import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "@features/filter";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { TranslationId } from "@shared/const/translation";
import { getUpdatedParams } from "@shared/lib/helpers/getUpdatedParams/getUpdatedParams";
import { filterMaterialConfig } from "@widgets/Material/config/filterMaterialConfig";
import { MaterialFiltersSchema } from "@widgets/Material/model/materialFiltersSchema";

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

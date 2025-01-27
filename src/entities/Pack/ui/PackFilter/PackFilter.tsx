import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { Filter } from "@shared/ui/Filter";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedParams } from "@shared/lib/helpers/getUpdatedParams/getUpdatedParams";
import { filterPackConfig } from "@entities/Pack/config/filterPackConfig";
import { PackFiltersSchema } from "@entities/Pack/model/types/packFiltersSchema";

interface PackFilterProps {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: PackFiltersSchema;
}

export const PackFilter: FC<PackFilterProps> = (props) => {
    const { updateSearchParams, initialFilters } = props;
    const { t } = useTranslation(TranslationId.PACK);

    const onApply = (selectedFilters: Record<string, unknown>) => {
        const filterMapping: Record<string, string> = {
            packs: "type",
            createdBefore: "createdBefore",
            createdAfter: "createdAfter",
        };
        const updatedParams = getUpdatedParams(selectedFilters, filterMapping);
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

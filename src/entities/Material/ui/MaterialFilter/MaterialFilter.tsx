import { FC } from "react";
import { Filter } from "@features/Filter";
import { filterConfig } from "@entities/Material/model/config/filterConfig";
import { UpdateSearchParamsFunc } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";

interface MaterialFilterProps {
    updateSearchParams: UpdateSearchParamsFunc;
}

export const MaterialFilter: FC<MaterialFilterProps> = (props) => {
    const { updateSearchParams } = props;
    const { t } = useTranslation(TranslationId.MATERIAL);

    const onApply = (selectedFilters: Record<string, unknown>) => {
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
    };

    const onReset = () => {
        updateSearchParams({
            hardness: [],
            createdBefore: null,
            createdAfter: null,
        });
    };

    return <Filter filters={filterConfig(t)} onApply={onApply} onReset={onReset} />;
};

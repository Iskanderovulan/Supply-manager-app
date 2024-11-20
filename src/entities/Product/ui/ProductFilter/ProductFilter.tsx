import { FC } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterProductConfig } from "@entities/Product/model/config/filterProductConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ProductFiltersSchema } from "@entities/Product/model/types/ProductFiltersSchema";
import { ProductClassificatorsSchema } from "@entities/Product/model/types/ProductClassificatorsSchema";

interface ProductFilterProps extends ProductClassificatorsSchema {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: ProductFiltersSchema;
}

export const ProductFilter: FC<ProductFilterProps> = (props) => {
    const { updateSearchParams, initialFilters, materialOptions, colorOptions, packOptions } =
        props;
    const { t } = useTranslation(TranslationId.PRODUCT);
    const onApply = (selectedFilters: Record<string, unknown>) => {
        const updatedParams: Record<string, string | null | string[]> = {
            page: null,
        };

        if (selectedFilters.materials) {
            updatedParams.materialIds = selectedFilters.materials as string[];
        }
        if (selectedFilters.colors) {
            updatedParams.colorIds = selectedFilters.colors as string[];
        }
        if (selectedFilters.packs) {
            updatedParams.packIds = selectedFilters.packs as string[];
        }

        if (selectedFilters.createdBefore) {
            updatedParams.createdBefore = selectedFilters.createdBefore as string;
        }
        if (selectedFilters.createdAfter) {
            updatedParams.createdAfter = selectedFilters.createdAfter as string;
        }
        if (selectedFilters.priceRange) {
            const [priceMin, priceMax] = selectedFilters.priceRange as [
                number | null,
                number | null,
            ];
            updatedParams.priceMin = priceMin?.toString() || null;
            updatedParams.priceMax = priceMax?.toString() || null;
        }

        updateSearchParams(updatedParams);
    };
    const onReset = () => {
        updateSearchParams({
            materialIds: null,
            colorIds: null,
            packIds: null,
            createdBefore: null,
            createdAfter: null,
            priceMin: null,
            priceMax: null,
        });
    };

    const filtersConfig = filterProductConfig(t, {
        materialOptions,
        colorOptions,
        packOptions,
    });

    return (
        <Filter<ProductFiltersSchema>
            filters={filtersConfig}
            onApply={onApply}
            onReset={onReset}
            initialFilters={initialFilters}
        />
    );
};

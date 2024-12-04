import { FC } from "react";
import { Filter } from "@shared/ui/Filter";
import { filterProductConfig } from "@entities/Product/model/config/filterProductConfig";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ProductFiltersSchema } from "@entities/Product/model/types/ProductFiltersSchema";
import { ProductClassificatorsSchema } from "@entities/Product/model/types/ProductClassificatorsSchema";
import { getUpdatedParams } from "@shared/lib/helpers/getUpdatedParams/getUpdatedParams";

interface ProductFilterProps extends ProductClassificatorsSchema {
    updateSearchParams: UpdateSearchParamsType;
    initialFilters: ProductFiltersSchema;
}

export const ProductFilter: FC<ProductFilterProps> = (props) => {
    const { updateSearchParams, initialFilters, materialOptions, colorOptions, packOptions } =
        props;
    const { t } = useTranslation(TranslationId.PRODUCT);

    const onApply = (selectedFilters: Record<string, unknown>) => {
        const filterMapping: Record<string, string> = {
            materials: "materialIds",
            colors: "colorIds",
            packs: "packIds",
            createdBefore: "createdBefore",
            createdAfter: "createdAfter",
        };

        const updatedParams = getUpdatedParams(selectedFilters, filterMapping);

        if (selectedFilters.priceRange) {
            const [priceMin, priceMax] = selectedFilters.priceRange as [
                number | null,
                number | null,
            ];
            console.log(priceMin, priceMax);
            updatedParams.priceMin = priceMin === 0 ? null : priceMin?.toString() || null;
            updatedParams.priceMax = priceMax === 0 ? null : priceMax?.toString() || null;
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

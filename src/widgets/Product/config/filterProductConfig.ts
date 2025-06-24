import { TFunction } from "i18next";
import { FilterType } from "@features/filter";
import { FilterConfig } from "@features/filter";

interface FilterProductConfigOptions {
    materialOptions: Array<{ label: string; value: string }>;
    colorOptions: Array<{ label: string; value: string }>;
    packOptions: Array<{ label: string; value: string }>;
}

export const filterProductConfig = (
    t: TFunction,
    options: FilterProductConfigOptions,
): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByMaterial"),
        key: "materials",
        options: options.materialOptions || "",
    },
    {
        type: FilterType.Checkbox,
        label: t("filterByColor"),
        key: "colors",
        options: options.colorOptions || "",
    },
    {
        type: FilterType.Checkbox,
        label: t("filterByPack"),
        key: "packs",
        options: options.packOptions || "",
    },
    {
        type: FilterType.Range,
        label: t("filterByPrice"),
        key: "priceRange",
    },
];

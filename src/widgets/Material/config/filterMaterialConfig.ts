import { TFunction } from "i18next";
import { FilterType } from "@features/filter";
import { FilterConfig } from "@features/filter";
import { hardnessOptions } from "../const/hardnessOptions";

export const filterMaterialConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByMaterialHardness"),
        key: "materials",
        options: hardnessOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
];

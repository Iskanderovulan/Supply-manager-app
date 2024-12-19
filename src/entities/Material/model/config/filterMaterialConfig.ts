import { hardnessOptions } from "../const/hardnessOptions";
import { FilterType } from "@shared/ui/Filter";
import { FilterConfig } from "@shared/ui/Filter";
import { TFunction } from "i18next";

export const filterMaterialConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByMaterialHardness"),
        key: "materials",
        options: hardnessOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
];

import { TFunction } from "i18next";
import { FilterType } from "@shared/ui/Filter";
import { FilterConfig } from "@shared/ui/Filter";
import { hardnessOptions } from "../model/const/hardnessOptions";

export const filterMaterialConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByMaterialHardness"),
        key: "materials",
        options: hardnessOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
];

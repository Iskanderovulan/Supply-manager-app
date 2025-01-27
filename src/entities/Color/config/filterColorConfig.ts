import { TFunction } from "i18next";
import { FilterType } from "@shared/ui/Filter";
import { FilterConfig } from "@shared/ui/Filter";
import { intensityOptions } from "../model/const/intensityOptions";

export const filterColorConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByColorIntensity"),
        key: "colors",
        options: intensityOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
];

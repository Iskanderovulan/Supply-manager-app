import { TFunction } from "i18next";
import { FilterType } from "@features/filter";
import { FilterConfig } from "@features/filter";
import { intensityOptions } from "../const/intensityOptions";

export const filterColorConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByColorIntensity"),
        key: "colors",
        options: intensityOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
];

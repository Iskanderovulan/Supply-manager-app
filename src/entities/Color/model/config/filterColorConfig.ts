import { intensityOptions } from "../const/intensityOptions";
import { FilterType } from "@shared/ui/Filter";
import { FilterConfig } from "@shared/ui/Filter";
import { TFunction } from "i18next";

export const filterColorConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByColorIntensity"),
        key: "colors",
        options: intensityOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
    {
        type: FilterType.DatePicker,
        label: t("filterByDate"),
        key: "dateRange",
    },
];

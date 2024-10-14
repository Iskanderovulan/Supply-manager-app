import { hardnessOptions } from "../const/hardnessOptions";
import { FilterConfig } from "@features/Filter";
import { TFunction } from "i18next";

export const filterConfig = (t: TFunction): FilterConfig[] => [
    {
        type: "checkbox",
        label: t("filterByMaterial"),
        key: "materials",
        options: hardnessOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
    {
        type: "datePicker",
        label: t("filterByDate"),
        key: "dateRange",
    },
];

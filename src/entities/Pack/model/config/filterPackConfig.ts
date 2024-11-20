import { typeOptions } from "../const/typeOptions";
import { FilterType } from "@shared/ui/Filter";
import { FilterConfig } from "@shared/ui/Filter";
import { TFunction } from "i18next";

export const filterPackConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByPackType"),
        key: "packs",
        options: typeOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
    {
        type: FilterType.DatePicker,
        label: t("filterByDate"),
        key: "dateRange",
    },
];

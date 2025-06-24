import { TFunction } from "i18next";
import { FilterType } from "@features/filter";
import { FilterConfig } from "@features/filter";
import { typeOptions } from "@widgets/Pack/const/typeOptions";

export const filterPackConfig = (t: TFunction): FilterConfig[] => [
    {
        type: FilterType.Checkbox,
        label: t("filterByPackType"),
        key: "packs",
        options: typeOptions.map((el) => ({ ...el, label: t(el.label) })),
    },
];

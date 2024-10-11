import { hardnessOptions } from "../const/hardnessOptions";
import { FilterConfig } from "@features/Filter";

export const filterConfig: FilterConfig[] = [
    {
        type: "checkbox",
        label: "Filter by Material",
        key: "materials",
        options: hardnessOptions,
    },
    {
        type: "datePicker",
        label: "Filter by Date",
        key: "dateRange",
    },
];

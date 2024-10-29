export enum FilterType {
    Checkbox = "checkbox",
    DatePicker = "datePicker",
}

export interface FilterConfig {
    type: FilterType;
    label: string;
    key: string;
    options?: { label: string; value: string | number }[];
}

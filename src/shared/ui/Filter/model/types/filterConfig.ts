export enum FilterType {
    Checkbox = "checkbox",
    Range = "range",
}

export interface FilterConfig {
    type: FilterType;
    label: string;
    key: string;
    options?: { label: string; value: string | number }[];
    min?: number;
    max?: number;
}

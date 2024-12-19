export enum FilterType {
    Checkbox = "checkbox",
    Range = "range",
}

export interface FilterConfig {
    type: FilterType;
    label: string;
    key: string;
    options?: { label: string; value: string | number }[];
    min?: number; // Минимальное значение для диапазона
    max?: number; // Максимальное значение для диапазона
}

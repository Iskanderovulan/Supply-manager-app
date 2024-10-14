export interface FilterConfig {
    type: "checkbox" | "datePicker";
    label: string;
    key: string;
    options?: { label: string; value: string | number }[];
}

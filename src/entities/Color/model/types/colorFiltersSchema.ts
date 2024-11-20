export interface ColorFiltersSchema extends Record<string, unknown> {
    colors: string[];
    dateRange: [string | null, string | null] | null;
}

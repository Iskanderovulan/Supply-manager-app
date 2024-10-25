export interface MaterialFiltersSchema extends Record<string, unknown> {
    materials: string[];
    dateRange: [string | null, string | null] | null;
}

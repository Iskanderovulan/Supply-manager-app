export interface PackFiltersSchema extends Record<string, unknown> {
    packs: string[];
    dateRange: [string | null, string | null] | null;
}

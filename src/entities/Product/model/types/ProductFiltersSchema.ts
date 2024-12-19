export interface ProductFiltersSchema extends Record<string, unknown> {
    materials: string[];
    colors: string[];
    packs: string[];
}

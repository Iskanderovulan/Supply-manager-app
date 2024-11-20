export interface ProductFiltersSchema extends Record<string, unknown> {
    materials: string[]; // Список ID выбранных материалов
    colors: string[]; // Список ID выбранных цветов
    packs: string[]; // Список ID выбранных пакетов
    dateRange: [string | null, string | null] | null;
    priceRange?: [number | null, number | null]; // Диапазон цен
}

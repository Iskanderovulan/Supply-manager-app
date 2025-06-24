export interface Stats {
    colors: number;
    materials: number;
    packs: number;
    products: number;
    total: number;
}

export interface Category {
    category: string;
    count: number;
}

export interface ChartSchema {
    stats: Stats;
    categories: Category[];
}

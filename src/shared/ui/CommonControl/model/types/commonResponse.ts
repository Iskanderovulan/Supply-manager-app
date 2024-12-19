export interface CommonResponse<T> {
    results: T;
    totalResults?: number;
    totalPages?: number;
}

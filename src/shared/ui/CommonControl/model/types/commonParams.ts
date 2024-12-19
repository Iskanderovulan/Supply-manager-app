export interface GetCommonParams {
    page?: number;
    limit?: number;
    name?: string;
    createdBefore?: string;
    createdAfter?: string;
    sortBy?: string;
    paginated?: boolean;
}

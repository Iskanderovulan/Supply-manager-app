import { FC, useCallback } from "react";
import { CustomPagination } from "@shared/ui/CustomPagination";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue";

interface MaterialPaginationProps {
    totalPages?: number;
    updateSearchParams: UpdateSearchParamsType;
    totalResults: number;
    currentPage: number;
    pageSize: number;
}

export const MaterialPagination: FC<MaterialPaginationProps> = (props) => {
    const { totalPages, updateSearchParams, ...rest } = props;

    const onPageChange = useCallback(
        (newPage: number) => {
            updateSearchParams({
                page: getUpdatedValue(newPage, 1),
            });
        },
        [updateSearchParams],
    );

    return (
        <>
            {!!totalPages && totalPages > 1 && (
                <CustomPagination onPageChange={onPageChange} {...rest} />
            )}
        </>
    );
};

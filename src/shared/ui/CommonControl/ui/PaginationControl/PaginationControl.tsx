import { FC, memo } from "react";
import { CustomPagination } from "@shared/ui/CustomPagination";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue/getUpdatedValue";

export interface PaginationControlProps {
    totalPages?: number;
    updateSearchParams: UpdateSearchParamsType;
    totalResults: number;
    currentPage: number;
    pageSize: number;
}

export const PaginationControl: FC<PaginationControlProps> = memo((props) => {
    const { totalPages, updateSearchParams, ...rest } = props;
    const onPageChange = (newPage: number) => {
        updateSearchParams(
            {
                page: getUpdatedValue(newPage, 1),
            },
            { replace: false },
        );
    };
    return (
        <>
            {!!totalPages && totalPages > 1 && (
                <CustomPagination onPageChange={onPageChange} {...rest} />
            )}
        </>
    );
});

PaginationControl.displayName = "PaginationControl";

import { FC } from "react";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";

interface CustomPaginationProps extends PaginationProps {
    totalResults: number;
    currentPage: number;
    onPageChange: (page: number, limit: number) => void;
}

export const CustomPagination: FC<CustomPaginationProps> = (props) => {
    const { totalResults, currentPage, pageSize, onPageChange, ...rest } = props;
    return (
        <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={pageSize}
            onChange={onPageChange}
            {...rest}
        />
    );
};

import { FC } from "react";
import { Flex } from "antd";

import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@shared/ui/CommonControl";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { Loader } from "@shared/ui/Loader";
import { ErrorMessage } from "@shared/ui/ErrorMessage";

import { useGetProductsQuery, useProductData } from "@entities/product";
import { useClassificators } from "@widgets/Product/lib/hooks/useClassificators";
import { useProductFilters } from "@widgets/Product/lib/hooks/useProductFilters";

import { ProductCreate } from "../ProductCreate/ProductCreate";
import { ProductTable } from "../ProductTable/ProductTable";
import { ProductFilter } from "../ProductFilter/ProductFilter";
import { ProductCrumb } from "../ProductCrumb/ProductCrumb";
import { ProductExcel } from "../ProductExcel/ProductExcel";

import cls from "./Product.module.scss";

export const Product: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();

    const {
        page,
        limit,
        name,
        sortBy,
        materialIds,
        colorIds,
        packIds,
        priceMin,
        priceMax,
        initialFilters,
    } = useProductFilters();

    const {
        materialOptions,
        colorOptions,
        packOptions,
        isLoading: isLoadingClassificators,
        error: errorClassificators,
    } = useClassificators();

    const {
        data: products,
        isFetching: isFetching,
        error: errorProducts,
    } = useGetProductsQuery({
        page,
        limit,
        name,
        materialIds,
        colorIds,
        packIds,
        sortBy,
        priceMin,
        priceMax,
    });

    const { totalPages, totalResults, results } = useProductData(products);

    if (isLoadingClassificators) return <Loader />;
    if (errorClassificators) return <ErrorMessage error={errorClassificators} />;

    return (
        <Flex gap="middle" vertical>
            <Flex justify="space-between">
                <Search updateSearchParams={updateSearchParams} searchTerm={name} />
                <ProductCrumb />
            </Flex>

            <Flex justify="space-between" gap="middle" align="center">
                <Flex className={cls.scrollable} gap="middle">
                    <ProductCreate
                        materialOptions={materialOptions}
                        colorOptions={colorOptions}
                        packOptions={packOptions}
                    />
                    <SortByDate
                        getDecodedParam={getDecodedParam}
                        updateSearchParams={updateSearchParams}
                    />
                    <ResetQueries updateSearchParams={updateSearchParams} />
                    <ProductExcel results={results} />
                </Flex>
                <ProductFilter
                    updateSearchParams={updateSearchParams}
                    initialFilters={initialFilters}
                    materialOptions={materialOptions}
                    colorOptions={colorOptions}
                    packOptions={packOptions}
                />
            </Flex>

            <ProductTable
                dataSource={results}
                isFetching={isFetching}
                error={errorProducts}
                materialOptions={materialOptions}
                colorOptions={colorOptions}
                packOptions={packOptions}
            />
            <Flex align="center" gap="middle">
                <PaginationControl
                    totalResults={totalResults}
                    currentPage={page}
                    pageSize={limit}
                    totalPages={totalPages}
                    updateSearchParams={updateSearchParams}
                />
                <ItemsPerPageControl limit={limit} updateSearchParams={updateSearchParams} />
            </Flex>
        </Flex>
    );
};

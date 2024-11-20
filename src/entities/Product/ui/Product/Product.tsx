import { FC, useMemo } from "react";
import { useGetMaterialsQuery } from "@entities/Material/api";
import { useGetColorsQuery } from "@entities/Color/api";
import { useGetPacksQuery } from "@entities/Pack/api";
import { useGetProductsQuery } from "@entities/Product/api";
import { Flex } from "antd";
import { ProductCreate } from "../ProductCreate/ProductCreate";
import { ProductsTable } from "../ProductTable/ProductTable";
import { ProductFilter } from "../ProductFilter/ProductFilter";
import { ProductCrumb } from "../ProductCrumb/ProductCrumb";
import { ProductFiltersSchema } from "@entities/Product/model/types/ProductFiltersSchema";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@entities/CommonControl";
import cls from "./Product.module.scss";
import { ProductExcel } from "../ProductExcel/ProductExcel";

export const Product: FC = () => {
    const { getSearchParam, updateSearchParams, getDecodedParam } = useFilterSearchParams();

    const page = Number(getSearchParam("page")) || 1;
    const limit = Number(getSearchParam("limit")) || defaultPageSizeOption;
    const name = getSearchParam("name") || "";
    const sortBy = getSearchParam("sortBy");

    const materialIds = useMemo(() => getSearchParam("materialIds", true) || [], [getSearchParam]);
    const colorIds = useMemo(() => getSearchParam("colorIds", true) || [], [getSearchParam]);
    const packIds = useMemo(() => getSearchParam("packIds", true) || [], [getSearchParam]);

    const createdBefore = getSearchParam("createdBefore");
    const createdAfter = getSearchParam("createdAfter");
    const priceMin = getSearchParam("priceMin");
    const priceMax = getSearchParam("priceMax");

    const { data: materials } = useGetMaterialsQuery({ paginated: false });
    const { data: colors } = useGetColorsQuery({ paginated: false });
    const { data: packs } = useGetPacksQuery({ paginated: false });
    console.log(materials);
    const {
        data: products,
        isLoading,
        error,
    } = useGetProductsQuery({
        page,
        limit,
        name,
        materialIds,
        colorIds,
        packIds,
        sortBy,
        createdBefore,
        createdAfter,
        priceMin,
        priceMax,
    });
    const totalPages = products?.totalPages;
    const totalResults = products?.totalResults || 0;
    const results = products?.results || [];
    const materialOptions = useMemo(
        () =>
            materials?.results.map((material) => ({
                label: material.name,
                value: material.id,
            })) || [],
        [materials],
    );
    const colorOptions = useMemo(
        () =>
            colors?.results.map((color) => ({
                label: color.name,
                value: color.id,
            })) || [],
        [colors],
    );

    const packOptions = useMemo(
        () =>
            packs?.results.map((pack) => ({
                label: pack.name,
                value: pack.id,
            })) || [],
        [packs],
    );
    const initialFilters = useMemo<ProductFiltersSchema>(
        () => ({
            materials: materialIds,
            colors: colorIds,
            packs: packIds,
            dateRange: createdAfter && createdBefore ? [createdAfter, createdBefore] : null,
            priceRange: [priceMin ? Number(priceMin) : null, priceMax ? Number(priceMax) : null],
        }),
        [materialIds, colorIds, packIds, createdBefore, createdAfter, priceMin, priceMax],
    );

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

            <ProductsTable
                dataSource={results}
                isLoading={isLoading}
                error={error}
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

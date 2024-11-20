import { FC, useMemo } from "react";
import { useGetMaterialsQuery } from "@entities/Material/api";
import { Flex } from "antd";
import { MaterialCreate } from "../MaterialCreate/MaterialCreate";
import { MaterialsTable } from "../MaterialTable/MaterialTable";
import { MaterialFilter } from "../MaterialFilter/MaterialFilter";
import { MaterialCrumb } from "../MaterialCrumb/MaterialCrumb";
import { MaterialFiltersSchema } from "@entities/Material/model/types/materialFiltersSchema";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@entities/CommonControl";
import cls from "./Material.module.scss";
import { MaterialExcel } from "../MaterialExcel/MaterialExcel";

export const Material: FC = () => {
    const { getSearchParam, updateSearchParams, getDecodedParam } = useFilterSearchParams();

    const page = Number(getSearchParam("page")) || 1;
    const limit = Number(getSearchParam("limit")) || defaultPageSizeOption;
    const name = getSearchParam("name") || "";
    const sortBy = getSearchParam("sortBy");

    const hardness = useMemo(() => getSearchParam("hardness", true) || [], [getSearchParam]);
    const createdBefore = getSearchParam("createdBefore");
    const createdAfter = getSearchParam("createdAfter");

    const {
        data: materials,
        isLoading,
        error,
    } = useGetMaterialsQuery({
        page,
        limit,
        name,
        hardness,
        createdBefore,
        createdAfter,
        sortBy,
    });

    const totalPages = materials?.totalPages;
    const totalResults = materials?.totalResults || 0;
    const results = materials?.results || [];

    const initialFilters = useMemo<MaterialFiltersSchema>(
        () => ({
            materials: hardness,
            dateRange: createdAfter && createdBefore ? [createdAfter, createdBefore] : null,
        }),
        [hardness, createdAfter, createdBefore],
    );

    return (
        <Flex gap="middle" vertical>
            <Flex justify="space-between">
                <Search updateSearchParams={updateSearchParams} searchTerm={name} />
                <MaterialCrumb />
            </Flex>

            <Flex justify="space-between" gap="middle" align="center">
                <Flex className={cls.scrollable} gap="middle">
                    <MaterialCreate />
                    <SortByDate
                        getDecodedParam={getDecodedParam}
                        updateSearchParams={updateSearchParams}
                    />
                    <ResetQueries updateSearchParams={updateSearchParams} />
                    <MaterialExcel results={results} />
                </Flex>
                <MaterialFilter
                    updateSearchParams={updateSearchParams}
                    initialFilters={initialFilters}
                />
            </Flex>

            <MaterialsTable dataSource={results} isLoading={isLoading} error={error} />
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

import { FC, useMemo } from "react";
import { useGetPacksQuery } from "@entities/Pack/api";
import { Flex } from "antd";
import { PackCreate } from "../PackCreate/PackCreate";
import { PacksTable } from "../PackTable/PackTable";
import { PackFilter } from "../PackFilter/PackFilter";
import { PackCrumb } from "../PackCrumb/PackCrumb";
import { PackFiltersSchema } from "@entities/Pack/model/types/packFiltersSchema";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@entities/CommonControl";
import cls from "./Pack.module.scss";
import { PackExcel } from "../PackExcel/PackExcel";

export const Pack: FC = () => {
    const { getSearchParam, updateSearchParams, getDecodedParam } = useFilterSearchParams();

    const page = Number(getSearchParam("page")) || 1;
    const limit = Number(getSearchParam("limit")) || defaultPageSizeOption;
    const name = getSearchParam("name") || "";
    const sortBy = getSearchParam("sortBy");

    const type = useMemo(() => getSearchParam("type", true) || [], [getSearchParam]);
    const createdBefore = getSearchParam("createdBefore");
    const createdAfter = getSearchParam("createdAfter");

    const {
        data: packs,
        isLoading,
        error,
    } = useGetPacksQuery({
        page,
        limit,
        name,
        type,
        createdBefore,
        createdAfter,
        sortBy,
    });

    const totalPages = packs?.totalPages;
    const totalResults = packs?.totalResults || 0;
    const results = packs?.results || [];

    const initialFilters = useMemo<PackFiltersSchema>(
        () => ({
            packs: type,
            dateRange: createdAfter && createdBefore ? [createdAfter, createdBefore] : null,
        }),
        [type, createdAfter, createdBefore],
    );

    return (
        <Flex gap="middle" vertical>
            <Flex justify="space-between">
                <Search updateSearchParams={updateSearchParams} searchTerm={name} />
                <PackCrumb />
            </Flex>

            <Flex justify="space-between" gap="middle" align="center">
                <Flex className={cls.scrollable} gap="middle">
                    <PackCreate />
                    <SortByDate
                        getDecodedParam={getDecodedParam}
                        updateSearchParams={updateSearchParams}
                    />
                    <ResetQueries updateSearchParams={updateSearchParams} />
                    <PackExcel results={results} />
                </Flex>
                <PackFilter
                    updateSearchParams={updateSearchParams}
                    initialFilters={initialFilters}
                />
            </Flex>

            <PacksTable dataSource={results} isLoading={isLoading} error={error} />
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

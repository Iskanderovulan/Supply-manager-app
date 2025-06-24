import { FC } from "react";
import { Flex } from "antd";

import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@shared/ui/CommonControl";

import { useGetPacksQuery, usePackData } from "@entities/pack";
import { usePackFilters } from "@widgets/Pack/lib/usePackFilters";

import { PackCreate } from "../PackCreate/PackCreate";
import { PackTable } from "../PackTable/PackTable";
import { PackFilter } from "../PackFilter/PackFilter";
import { PackCrumb } from "../PackCrumb/PackCrumb";
import { PackExcel } from "../PackExcel/PackExcel";

import cls from "./Pack.module.scss";

export const Pack: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();
    const { page, limit, name, sortBy, type, initialFilters } = usePackFilters();

    const {
        data: packs,
        isFetching,
        error,
    } = useGetPacksQuery({
        page,
        limit,
        name,
        type,
        sortBy,
    });

    const { totalPages, totalResults, results } = usePackData(packs);

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

            <PackTable dataSource={results} isFetching={isFetching} error={error} />
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

import { FC } from "react";
import { Flex } from "antd";
import { PackCreate } from "../PackCreate/PackCreate";
import { PacksTable } from "../PackTable/PackTable";
import { PackFilter } from "../PackFilter/PackFilter";
import { PackCrumb } from "../PackCrumb/PackCrumb";
import { PackExcel } from "../PackExcel/PackExcel";
import { usePackFilters } from "@entities/Pack/lib/usePackFilters";
import { usePackData } from "@entities/Pack/lib/usePackData";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { useGetPacksQuery } from "@entities/Pack/api";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@entities/CommonControl";
import cls from "./Pack.module.scss";

export const Pack: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();
    const { page, limit, name, sortBy, createdBefore, createdAfter, type, initialFilters } =
        usePackFilters();

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

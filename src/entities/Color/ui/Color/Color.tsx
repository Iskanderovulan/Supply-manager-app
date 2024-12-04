import { FC } from "react";
import { useGetColorsQuery } from "@entities/Color/api";
import { Flex } from "antd";
import { ColorCreate } from "../ColorCreate/ColorCreate";
import { ColorsTable } from "../ColorTable/ColorTable";
import { ColorFilter } from "../ColorFilter/ColorFilter";
import { ColorCrumb } from "../ColorCrumb/ColorCrumb";
import { useColorData } from "@entities/Color/lib/useColorData";
import { useColorFilters } from "@entities/Color/lib/useColorFilters";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@entities/CommonControl";
import cls from "./Color.module.scss";
import { ColorExcel } from "../ColorExcel/ColorExcel";

export const Color: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();
    const { page, limit, name, sortBy, createdBefore, createdAfter, intensity, initialFilters } =
        useColorFilters();

    const {
        data: colors,
        isLoading,
        error,
    } = useGetColorsQuery({
        page,
        limit,
        name,
        intensity,
        createdBefore,
        createdAfter,
        sortBy,
    });

    const { totalPages, totalResults, results } = useColorData(colors);

    return (
        <Flex gap="middle" vertical>
            <Flex justify="space-between">
                <Search updateSearchParams={updateSearchParams} searchTerm={name} />
                <ColorCrumb />
            </Flex>

            <Flex justify="space-between" gap="middle" align="center">
                <Flex className={cls.scrollable} gap="middle">
                    <ColorCreate />
                    <SortByDate
                        getDecodedParam={getDecodedParam}
                        updateSearchParams={updateSearchParams}
                    />
                    <ResetQueries updateSearchParams={updateSearchParams} />
                    <ColorExcel results={results} />
                </Flex>
                <ColorFilter
                    updateSearchParams={updateSearchParams}
                    initialFilters={initialFilters}
                />
            </Flex>

            <ColorsTable dataSource={results} isLoading={isLoading} error={error} />
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

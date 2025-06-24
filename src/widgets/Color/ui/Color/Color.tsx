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
import { useGetColorsQuery, useColorData } from "@entities/color";
import { useColorFilters } from "@widgets/Color/lib/useColorFilters";
import { ColorCreate } from "../ColorCreate/ColorCreate";
import { ColorTable } from "../ColorTable/ColorTable";
import { ColorFilter } from "../ColorFilter/ColorFilter";
import { ColorCrumb } from "../ColorCrumb/ColorCrumb";
import { ColorExcel } from "../ColorExcel/ColorExcel";

import cls from "./Color.module.scss";

export const Color: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();
    const { page, limit, name, sortBy, intensity, initialFilters } = useColorFilters();

    const {
        data: colors,
        isFetching,
        error,
    } = useGetColorsQuery({
        page,
        limit,
        name,
        intensity,
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

            <ColorTable dataSource={results} isFetching={isFetching} error={error} />
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

import { FC, useMemo } from "react";
import { useGetColorsQuery } from "@entities/Color/api";
import { Flex } from "antd";
import { ColorCreate } from "../ColorCreate/ColorCreate";
import { ColorsTable } from "../ColorTable/ColorTable";
import { ColorFilter } from "../ColorFilter/ColorFilter";
import { ColorCrumb } from "../ColorCrumb/ColorCrumb";
import { ColorFiltersSchema } from "@entities/Color/model/types/colorFiltersSchema";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
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
    const { getSearchParam, updateSearchParams, getDecodedParam } = useFilterSearchParams();

    const page = Number(getSearchParam("page")) || 1;
    const limit = Number(getSearchParam("limit")) || defaultPageSizeOption;
    const name = getSearchParam("name") || "";
    const sortBy = getSearchParam("sortBy");

    const intensity = useMemo(() => getSearchParam("intensity", true) || [], [getSearchParam]);
    const createdBefore = getSearchParam("createdBefore");
    const createdAfter = getSearchParam("createdAfter");

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

    const totalPages = colors?.totalPages;
    const totalResults = colors?.totalResults || 0;
    const results = colors?.results || [];

    const initialFilters = useMemo<ColorFiltersSchema>(
        () => ({
            colors: intensity,
            dateRange: createdAfter && createdBefore ? [createdAfter, createdBefore] : null,
        }),
        [intensity, createdAfter, createdBefore],
    );

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

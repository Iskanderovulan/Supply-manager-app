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
import {
    MaterialCreate,
    MaterialsTable,
    MaterialFilter,
    MaterialCrumb,
    MaterialExcel,
    useMaterialFilters,
    useMaterialData,
    useGetMaterialsQuery,
} from "@entities/Material";
import cls from "./Material.module.scss";

export const Material: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();
    const { page, limit, name, sortBy, hardness, initialFilters } = useMaterialFilters();

    const {
        data: materials,
        isLoading,
        error,
    } = useGetMaterialsQuery({
        page,
        limit,
        name,
        hardness,
        sortBy,
    });

    const { totalPages, totalResults, results } = useMaterialData(materials);

    return (
        <Flex gap="middle" vertical data-testid="MaterialWidget">
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

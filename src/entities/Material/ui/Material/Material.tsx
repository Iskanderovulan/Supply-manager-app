import { FC } from "react";
import { Flex } from "antd";
import { MaterialCreate } from "../MaterialCreate/MaterialCreate";
import { MaterialsTable } from "../MaterialTable/MaterialTable";
import { MaterialFilter } from "../MaterialFilter/MaterialFilter";
import { MaterialCrumb } from "../MaterialCrumb/MaterialCrumb";
import { MaterialExcel } from "../MaterialExcel/MaterialExcel";
import { useMaterialFilters } from "@entities/Material/lib/useMaterialFilters";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams";
import { useMaterialData } from "@entities/Material/lib/useMaterialData";
import { useGetMaterialsQuery } from "@entities/Material/api";
import {
    ResetQueries,
    SortByDate,
    PaginationControl,
    ItemsPerPageControl,
    Search,
} from "@entities/CommonControl";
import cls from "./Material.module.scss";

export const Material: FC = () => {
    const { updateSearchParams, getDecodedParam } = useFilterSearchParams();
    const { page, limit, name, sortBy, createdBefore, createdAfter, hardness, initialFilters } =
        useMaterialFilters();

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

    const { totalPages, totalResults, results } = useMaterialData(materials);

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

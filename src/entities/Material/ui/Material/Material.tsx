import { FC, useMemo } from "react";
import { useGetMaterialsQuery } from "@entities/Material/model/api/materialApi";
import { Flex } from "antd";
import { CreateMaterial } from "../CreateMaterial/CreateMaterial";
import { MaterialsTable } from "../MaterialTable/MaterialTable";
import { MaterialSearch } from "../MaterialSearch/MaterialSearch";
import { useFilterSearchParams } from "@shared/lib/hooks/useFilterSearchParams/useFilterSearchParams";
import { defaultPageSizeOption } from "@shared/const/pageSizeOptions";
import { MaterialPagination } from "../MaterialPagination/MaterialPagination";
import { MaterialPerPage } from "../MaterialPerPage/MaterialPerPage";
import { MaterialFilter } from "../MaterialFilter/MaterialFilter";
import { MaterialFiltersSchema } from "@entities/Material/model/types/materialFiltersSchema";
import { MaterialReset } from "../MaterialReset/MaterialReset";

export const Material: FC = () => {
    const { getSearchParam, updateSearchParams } = useFilterSearchParams();

    const page = Number(getSearchParam("page")) || 1;
    const limit = Number(getSearchParam("limit")) || defaultPageSizeOption;
    const name = getSearchParam("name") || "";

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
    });

    const totalPages = materials?.totalPages;
    const totalResults = materials?.totalResults || 0;
    const results = materials?.results || [];

    const initialFilters = useMemo<MaterialFiltersSchema>(
        () => ({
            materials: hardness,
            dateRange: createdBefore && createdAfter ? [createdBefore, createdAfter] : null,
        }),
        [hardness, createdBefore, createdAfter],
    );

    return (
        <Flex gap="middle" vertical>
            <Flex justify="space-between" gap="middle">
                <Flex gap="middle">
                    <CreateMaterial />
                    <MaterialSearch updateSearchParams={updateSearchParams} searchTerm={name} />
                    <MaterialReset updateSearchParams={updateSearchParams} />
                </Flex>
                <MaterialFilter
                    updateSearchParams={updateSearchParams}
                    initialFilters={initialFilters}
                />
            </Flex>

            <MaterialsTable dataSource={results} isLoading={isLoading} error={error} />
            <Flex align="center" gap="middle">
                <MaterialPagination
                    totalResults={totalResults}
                    currentPage={page}
                    pageSize={limit}
                    totalPages={totalPages}
                    updateSearchParams={updateSearchParams}
                />
                <MaterialPerPage limit={limit} updateSearchParams={updateSearchParams} />
            </Flex>
        </Flex>
    );
};

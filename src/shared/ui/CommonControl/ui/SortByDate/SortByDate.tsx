import { FC, memo } from "react";
import { Button, Tooltip } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";

enum SortOrder {
    ASC = "asc",
    DESC = "desc",
}

interface SortByDateProps {
    updateSearchParams: UpdateSearchParamsType;
    getDecodedParam(paramKey: string): string;
}

export const SortByDate: FC<SortByDateProps> = memo((props) => {
    const { updateSearchParams, getDecodedParam } = props;
    const { t: global } = useTranslation();
    const currentSortOrder: SortOrder = getDecodedParam("sortBy")?.includes(SortOrder.DESC)
        ? SortOrder.DESC
        : SortOrder.ASC;

    const toggleSortOrder = () => {
        const newSortOrder: SortOrder =
            currentSortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
        const sortBy = `createdAt:${newSortOrder}`;
        updateSearchParams({ sortBy });
    };

    return (
        <Tooltip title={global("sortByDate")}>
            <Button type="primary" onClick={toggleSortOrder}>
                {currentSortOrder === SortOrder.ASC ? <ArrowUpOutlined /> : <ArrowDownOutlined />}

                {global("sort")}
            </Button>
        </Tooltip>
    );
});

SortByDate.displayName = "SortByDate";

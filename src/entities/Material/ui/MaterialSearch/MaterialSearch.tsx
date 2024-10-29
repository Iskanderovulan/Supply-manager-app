import { FC, useCallback } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue";

interface MaterialSearchProps {
    updateSearchParams: UpdateSearchParamsType;
    searchTerm: string;
}

export const MaterialSearch: FC<MaterialSearchProps> = (props) => {
    const { searchTerm, updateSearchParams } = props;
    const { t } = useTranslation();

    const onSearch = useCallback(
        (newValue: string) => {
            updateSearchParams({
                page: null,
                name: getUpdatedValue(newValue, ""),
            });
        },
        [updateSearchParams],
    );

    return (
        <Input
            allowClear
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t("searchByName")}
            prefix={<SearchOutlined />}
        />
    );
};

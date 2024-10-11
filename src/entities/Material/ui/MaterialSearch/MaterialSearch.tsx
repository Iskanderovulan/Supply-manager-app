import { FC } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { UpdateSearchParamsFunc } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue";

interface MaterialSearchProps {
    updateSearchParams: UpdateSearchParamsFunc;
    searchTerm: string;
}

export const MaterialSearch: FC<MaterialSearchProps> = (props) => {
    const { searchTerm, updateSearchParams } = props;

    const { t } = useTranslation();

    const onSearch = (newValue: string) => {
        updateSearchParams({
            page: null,
            name: getUpdatedValue(newValue, ""),
        });
    };

    return (
        <Input
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t("searchByName")}
        />
    );
};

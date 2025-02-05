import { FC, memo, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { getUpdatedValue } from "@shared/lib/helpers/getUpdatedValue/getUpdatedValue";
import { useDebounce } from "@shared/lib/hooks/useDebounce";
import cls from "./Search.module.scss";

interface SearchProps {
    updateSearchParams: UpdateSearchParamsType;
    searchTerm: string;
}

export const Search: FC<SearchProps> = memo((props) => {
    const { searchTerm, updateSearchParams } = props;
    const { t: global } = useTranslation();
    const [inputValue, setInputValue] = useState(searchTerm);

    const debouncedUpdateSearchParams = useDebounce((value: string) => {
        updateSearchParams({
            page: null,
            name: getUpdatedValue(value, ""),
        });
    }, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedUpdateSearchParams(value);
    };

    return (
        <Input
            className={cls.Search}
            allowClear
            value={inputValue}
            onChange={handleChange}
            placeholder={global("searchByName")}
            prefix={<SearchOutlined />}
        />
    );
});

Search.displayName = "Search";

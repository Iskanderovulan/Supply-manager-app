import { FC } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { pageSizeOptions } from "@shared/const/pageSizeOptions";

export interface ItemsPerPageProps {
    limit: number;
    onLimitChange: (newLimit: number) => void;
}

export const ItemsPerPage: FC<ItemsPerPageProps> = (props) => {
    const { limit, onLimitChange } = props;
    const { t: global } = useTranslation();
    return (
        <Select
            className="custom-select"
            value={limit}
            onChange={onLimitChange}
            options={pageSizeOptions.map((size) => ({
                label: `${size} ${global("items")}`,
                value: size,
            }))}
        />
    );
};

import { FC } from "react";
import { Select } from "antd";
import { pageSizeOptions } from "@shared/const/pageSizeOptions";
import { useTranslation } from "react-i18next";

interface ItemsPerPageProps {
    limit: number;
    onLimitChange: (newLimit: number) => void;
}

export const ItemsPerPage: FC<ItemsPerPageProps> = ({ limit, onLimitChange }) => {
    const { t } = useTranslation();
    return (
        <Select
            className="custom-select"
            value={limit}
            onChange={onLimitChange}
            options={pageSizeOptions.map((size) => ({
                label: `${size} ${t("items")}`,
                value: size,
            }))}
        />
    );
};

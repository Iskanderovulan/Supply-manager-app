import { FC, useCallback } from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

interface ResetFiltersButtonProps {
    updateSearchParams: UpdateSearchParamsType;
}

export const MaterialReset: FC<ResetFiltersButtonProps> = ({ updateSearchParams }) => {
    const { t } = useTranslation(TranslationId.MATERIAL);

    const handleResetFilters = useCallback(() => {
        updateSearchParams({});
    }, [updateSearchParams]);

    return (
        <Button onClick={handleResetFilters} type="primary" icon={<ReloadOutlined />}>
            {t("resetAll")}
        </Button>
    );
};

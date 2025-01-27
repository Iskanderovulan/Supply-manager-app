import { FC, memo } from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UpdateSearchParamsType } from "@shared/lib/hooks/useFilterSearchParams";

interface ResetQueriesButtonProps {
    updateSearchParams: UpdateSearchParamsType;
}

export const ResetQueries: FC<ResetQueriesButtonProps> = memo(({ updateSearchParams }) => {
    const { t: global } = useTranslation();

    const handleResetFilters = () => {
        updateSearchParams({});
    };

    return (
        <Button onClick={handleResetFilters} type="primary" icon={<ReloadOutlined />}>
            {global("resetAll")}
        </Button>
    );
});

ResetQueries.displayName = "ResetQueries";

import { FC } from "react";
import { Button, Flex } from "antd";
import { TFunction } from "i18next";

interface FilterFooterProps {
    onApply: () => void;
    onReset: () => void;
    t: TFunction;
}

export const FilterFooter: FC<FilterFooterProps> = (props) => {
    const { onApply, onReset, t } = props;
    return (
        <div>
            <Flex gap="middle" justify="end" align="center">
                <Button onClick={onReset}>{t("reset")}</Button>
                <Button type="primary" onClick={onApply}>
                    {t("applyFilters")}
                </Button>
            </Flex>
        </div>
    );
};

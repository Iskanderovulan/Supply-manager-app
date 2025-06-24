import { FC } from "react";
import { Button, Flex } from "antd";
import { TFunction } from "i18next";

interface FilterFooterProps {
    onExit: () => void;
    onApply: () => void;
    onReset: () => void;
    t: TFunction;
}

export const FilterFooter: FC<FilterFooterProps> = (props) => {
    const { onExit, onApply, onReset, t } = props;

    return (
        <div>
            <Flex gap="middle" justify="end" align="center">
                <Button type="primary" onClick={onApply}>
                    {t("applyFilters")}
                </Button>
                <Button onClick={onReset}>{t("reset")}</Button>

                <Button onClick={onExit}>{t("exit")}</Button>
            </Flex>
        </div>
    );
};

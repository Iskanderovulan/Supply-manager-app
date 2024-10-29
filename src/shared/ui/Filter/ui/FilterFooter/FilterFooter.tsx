import { FC, useMemo } from "react";
import { Button, Flex } from "antd";
import { TFunction } from "i18next";
import { RecordValueGroup } from "../../model/types/valueGroup";

interface FilterFooterProps {
    selectedFilters: RecordValueGroup;
    onExit: () => void;
    onApply: () => void;
    onReset: () => void;
    t: TFunction;
}

export const FilterFooter: FC<FilterFooterProps> = (props) => {
    const { onExit, onApply, onReset, selectedFilters, t } = props;

    const isDisabled = useMemo(() => {
        return (
            Object.keys(selectedFilters).length === 0 ||
            Object.values(selectedFilters).every(
                (value) => value === null || (Array.isArray(value) && value.length === 0),
            )
        );
    }, [selectedFilters]);

    return (
        <div>
            <Flex gap="middle" justify="end" align="center">
                <Button disabled={isDisabled} type="primary" onClick={onApply}>
                    {t("applyFilters")}
                </Button>
                <Button onClick={onReset}>{t("reset")}</Button>

                <Button onClick={onExit}>{t("exit")}</Button>
            </Flex>
        </div>
    );
};

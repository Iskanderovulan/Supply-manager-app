import { FC, useState } from "react";
import { Checkbox, Button, Flex } from "antd";
import { FilterConfig } from "../../model/types/filterConfig";
import { Value } from "../../model/types/valueGroup";
import cls from "./FilterCheckbox.module.scss";
import { TFunction } from "i18next";

interface FilterCheckboxProps {
    filter: FilterConfig;
    selectedValue: Value;
    onChange: (value: Value) => void;
    t: TFunction;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = (props) => {
    const { filter, selectedValue, onChange, t } = props;

    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => setShowAll((prev) => !prev);

    const handleCheckboxChange = (checkedValues: Value) => {
        onChange(checkedValues);
    };

    const handleSelectAll = () => {
        if (filter.options) {
            const allValues = filter.options.map((option) => option.value);
            onChange(allValues);
        }
    };

    const handleReset = () => {
        onChange([]);
    };

    const displayedOptions = showAll ? filter.options : filter.options?.slice(0, 10);

    return (
        <Flex vertical align="flex-start">
            {filter.options && filter.options.length > 10 && (
                <Button
                    className={cls.marginBottom}
                    type="dashed"
                    size="small"
                    onClick={toggleShowAll}
                    data-testid="toggle-show-button"
                >
                    {showAll ? t("hideAll") : t("seeAll")}
                </Button>
            )}
            <Checkbox.Group
                className={cls.checkbox}
                options={displayedOptions}
                value={selectedValue}
                onChange={handleCheckboxChange}
            />

            <Flex className={cls.marginTop} justify="end" gap="small">
                <Button
                    type="dashed"
                    size="small"
                    onClick={handleSelectAll}
                    data-testid="select-all-button"
                >
                    {t("selectAll")}
                </Button>
                <Button type="dashed" size="small" onClick={handleReset} data-testid="reset-button">
                    {t("reset")}
                </Button>
            </Flex>
        </Flex>
    );
};

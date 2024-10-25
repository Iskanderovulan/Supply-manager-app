import { FC } from "react";
import { Checkbox, Button, Flex } from "antd";
import { FilterConfig } from "../../model/types/filterConfig";
import { Value } from "@features/Filter/model/types/valueGroup";
import cls from "./CheckboxFilter.module.scss";
import { TFunction } from "i18next";

interface CheckboxFilterProps {
    filter: FilterConfig;
    selectedValue: Value;
    onChange: (value: Value) => void;
    t: TFunction;
}

export const CheckboxFilter: FC<CheckboxFilterProps> = (props) => {
    const { filter, selectedValue, onChange, t } = props;

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

    return (
        <>
            <Checkbox.Group
                className={cls.checkbox}
                options={filter.options}
                value={selectedValue?.map((el) => Number(el))}
                onChange={handleCheckboxChange}
            />
            <Flex className={cls.flex} justify="end" gap="small">
                <Button type="dashed" size="small" onClick={handleSelectAll}>
                    {t("selectAll")}
                </Button>
                <Button type="dashed" size="small" onClick={handleReset}>
                    {t("reset")}
                </Button>
            </Flex>
        </>
    );
};

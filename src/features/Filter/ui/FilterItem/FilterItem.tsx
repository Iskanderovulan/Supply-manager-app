import React from "react";
import { Checkbox, DatePicker } from "antd";
import { FilterConfig } from "../../model/types/filterConfig";
import { ValueGroup, DayjsType, Value } from "@features/Filter/model/types/valueGroup";
import cls from "./FilterItem.module.scss";

interface FilterItemProps {
    filter: FilterConfig;
    selectedValue: ValueGroup;
    onChange: (value: ValueGroup) => void;
}

export const FilterItem: React.FC<FilterItemProps> = ({ filter, selectedValue, onChange }) => {
    switch (filter.type) {
        case "checkbox":
            return (
                <Checkbox.Group
                    className={cls.checkbox}
                    options={filter.options}
                    value={selectedValue as Value}
                    onChange={onChange}
                />
            );
        case "datePicker":
            return (
                <DatePicker.RangePicker value={selectedValue as DayjsType} onChange={onChange} />
            );
        default:
            return null;
    }
};

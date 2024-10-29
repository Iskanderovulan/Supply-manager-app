import { FC } from "react";
import { FilterConfig, FilterType } from "../../model/types/filterConfig";
import { ValueGroup, DayjsType, Value } from "../../model/types/valueGroup";
import { CheckboxFilter } from "../CheckboxFilter/CheckboxFilter";
import { DatePickerFilter } from "../DatePickerFilter/DatePickerFilter";
import { TFunction } from "i18next";

interface FilterItemProps {
    filter: FilterConfig;
    selectedValue: ValueGroup;
    onChange: (value: ValueGroup) => void;
    t: TFunction;
}

export const FilterItem: FC<FilterItemProps> = (props) => {
    const { filter, selectedValue, onChange, t } = props;
    switch (filter.type) {
        case FilterType.Checkbox:
            return (
                <CheckboxFilter
                    filter={filter}
                    selectedValue={selectedValue as Value}
                    onChange={onChange}
                    t={t}
                />
            );

        case FilterType.DatePicker:
            return (
                <DatePickerFilter
                    selectedValue={selectedValue as DayjsType}
                    onChange={onChange}
                    t={t}
                />
            );

        default:
            return null;
    }
};

import { FC } from "react";
import { FilterConfig, FilterType } from "../../model/types/filterConfig";
import { ValueGroup, DayjsType, Value } from "../../model/types/valueGroup";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
import { FilterDatePicker } from "../FilterDatePicker/FilterDatePicker";
import { FilterRange } from "../FilterRange/FilterRange";
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
                <FilterCheckbox
                    filter={filter}
                    selectedValue={selectedValue as Value}
                    onChange={onChange}
                    t={t}
                />
            );

        case FilterType.DatePicker:
            return (
                <FilterDatePicker
                    selectedValue={selectedValue as DayjsType}
                    onChange={onChange}
                    t={t}
                />
            );

        case FilterType.Range:
            return (
                <FilterRange
                    selectedValue={selectedValue as [number, number]}
                    onChange={onChange}
                    t={t}
                    min={filter.min || 0} // Минимальное значение диапазона
                    max={filter.max || 1000} // Максимальное значение диапазона
                />
            );

        default:
            return null;
    }
};

import { FC } from "react";
import { FilterConfig, FilterType } from "../../model/types/filterConfig";
import { ValueGroup, Value } from "../../model/types/valueGroup";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";
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

        case FilterType.Range:
            return (
                <FilterRange
                    selectedValue={selectedValue as [number, number]}
                    onChange={onChange}
                    t={t}
                    min={filter.min || 0}
                    max={filter.max || 100}
                />
            );

        default:
            return null;
    }
};

import React from "react";
import { Drawer, Collapse } from "antd";
import { FilterFooter } from "../FilterFooter/FilterFooter";
import { FilterItem } from "../FilterItem/FilterItem";
import { FilterConfig } from "../..//model/types/filterConfig";
import { ValueGroup } from "@features/Filter/model/types/valueGroup";


interface FilterDrawerProps {
    visible: boolean;
    closeDrawer: () => void;
    filters: FilterConfig[];
    selectedFilters: Record<string, ValueGroup>;
    onFilterChange: (key: string, value: ValueGroup) => void;
    onApply: () => void;
    onReset: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
    visible,
    closeDrawer,
    filters,
    selectedFilters,
    onFilterChange,
    onApply,
    onReset,
}) => {
    // Формируем данные для Collapse через items
    const collapseItems = filters.map((filter) => ({
        key: filter.key,
        label: filter.label,
        children: (
            <FilterItem
                filter={filter}
                selectedValue={selectedFilters[filter.key]}
                onChange={(value) => onFilterChange(filter.key, value)}
            />
        ),
    }));

    return (
        <Drawer
            title="Filter Options"
            placement="right"
            onClose={closeDrawer}
            open={visible}
            width={400}
            footer={<FilterFooter onApply={onApply} onReset={onReset} />}
        >
            <Collapse items={collapseItems} />
        </Drawer>
    );
};

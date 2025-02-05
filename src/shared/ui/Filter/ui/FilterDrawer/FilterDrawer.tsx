import { FC } from "react";
import { Drawer, Collapse } from "antd";
import { TFunction } from "i18next";
import { FilterFooter } from "../FilterFooter/FilterFooter";
import { FilterItem } from "../FilterItem/FilterItem";
import { FilterConfig } from "../..//model/types/filterConfig";
import { ValueGroup, RecordValueGroup } from "../../model/types/valueGroup";

interface FilterDrawerProps {
    visible: boolean;
    closeDrawer: () => void;
    filters: FilterConfig[];
    selectedFilters: RecordValueGroup;
    onFilterChange: (key: string, value: ValueGroup) => void;
    onApply: () => void;
    onReset: () => void;
    t: TFunction;
}

export const FilterDrawer: FC<FilterDrawerProps> = (props) => {
    const { visible, closeDrawer, filters, selectedFilters, onFilterChange, onApply, onReset, t } =
        props;
    const collapseItems = filters.map((filter) => ({
        key: filter.key,
        label: filter.label,
        children: (
            <FilterItem
                filter={filter}
                selectedValue={selectedFilters[filter.key]}
                onChange={(value) => onFilterChange(filter.key, value)}
                t={t}
            />
        ),
    }));

    return (
        <Drawer
            title={t("filterOptions")}
            placement="right"
            onClose={closeDrawer}
            open={visible}
            width={400}
            footer={<FilterFooter onExit={closeDrawer} onApply={onApply} onReset={onReset} t={t} />}
        >
            <Collapse
                className="custom-collpase"
                items={collapseItems}
                defaultActiveKey={collapseItems.map((item) => item.key)}
            />
        </Drawer>
    );
};

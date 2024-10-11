import React, { useState } from "react";
import { Drawer, Button, Collapse, Checkbox, DatePicker } from "antd";

const { RangePicker } = DatePicker;

export interface FilterConfig {
    type: "checkbox" | "datePicker";
    label: string;
    key: string;
    options?: { label: string; value: string | number }[];
}

interface FilterProps {
    filters: FilterConfig[];
    onApply: (selectedFilters: Record<string, any>) => void;
    onReset: () => void;
}

export const Filter: React.FC<FilterProps> = ({ filters, onApply, onReset }) => {
    const [visible, setVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

    const showDrawer = () => {
        setVisible(true);
    };

    const closeDrawer = () => {
        setVisible(false);
    };

    const handleFilterChange = (key: string, value: any) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleApplyFilters = () => {
        const filtersToApply = { ...selectedFilters };

        // Преобразуем диапазон дат в ISO-формат, если это необходимо
        if (filtersToApply.dateRange) {
            const dateRange = filtersToApply.dateRange;
            filtersToApply.createdAfter = dateRange[0] ? dateRange[0].toISOString() : null;
            filtersToApply.createdBefore = dateRange[1] ? dateRange[1].toISOString() : null;
            delete filtersToApply.dateRange; // Удаляем исходный ключ `dateRange`
        }

        onApply(filtersToApply);
        closeDrawer();
    };

    const handleResetFilters = () => {
        setSelectedFilters({});
        onReset();
    };

    const renderFilterItem = (filter: FilterConfig) => {
        switch (filter.type) {
            case "checkbox":
                return (
                    <Checkbox.Group
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                        options={filter.options}
                        value={selectedFilters[filter.key] || []}
                        onChange={(values) => handleFilterChange(filter.key, values)}
                    />
                );
            case "datePicker":
                return (
                    <RangePicker
                        value={selectedFilters[filter.key] || null}
                        onChange={(dates) => handleFilterChange(filter.key, dates)}
                    />
                );
            default:
                return null;
        }
    };

    const collapseItems = filters.map((filter) => ({
        key: filter.key,
        label: filter.label,
        children: renderFilterItem(filter),
    }));

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Filters
            </Button>
            <Drawer
                title="Filter Options"
                placement="right"
                onClose={closeDrawer}
                open={visible}
                width={400}
                footer={
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={handleResetFilters} style={{ marginRight: 8 }}>
                            Reset
                        </Button>
                        <Button type="primary" onClick={handleApplyFilters}>
                            Apply Filters
                        </Button>
                    </div>
                }
            >
                <Collapse items={collapseItems} />
            </Drawer>
        </>
    );
};

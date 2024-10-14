import React, { useState } from "react";
import { Button } from "antd";
import { FilterDrawer } from "../FilterDrawer/FilterDrawer";
import { FilterConfig } from "../../model/types/filterConfig";
import { ValueGroup, DayjsType } from "@features/Filter/model/types/valueGroup";
import { useModal } from "@shared/lib/hooks/useModal/useModal";

interface FilterProps {
    filters: FilterConfig[];
    onApply: (selectedFilters: Record<string, ValueGroup>) => void;
    onReset: () => void;
}
export const Filter: React.FC<FilterProps> = ({ filters, onApply, onReset }) => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const [selectedFilters, setSelectedFilters] = useState<Record<string, ValueGroup>>({});

    const handleFilterChange = (key: string, value: ValueGroup) => {
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const handleApplyFilters = () => {
        const filtersToApply = { ...selectedFilters };

        // Проверяем наличие и корректность фильтра dateRange
        if (filtersToApply.dateRange) {
            const dateRange = filtersToApply.dateRange as DayjsType; // Явное указание типа
            filtersToApply.createdAfter = dateRange[0] ? dateRange[0].toISOString() : null;
            filtersToApply.createdBefore = dateRange[1] ? dateRange[1].toISOString() : null;
            delete filtersToApply.dateRange; // Удаляем исходный ключ `dateRange`
        }

        // Здесь нужно убедиться, что передаём изменённый объект filtersToApply
        onApply(filtersToApply);
        hideModal();
    };

    const handleResetFilters = () => {
        setSelectedFilters({});
        onReset();
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Filters
            </Button>
            <FilterDrawer
                visible={isModalOpen}
                closeDrawer={hideModal}
                filters={filters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
            />
        </>
    );
};

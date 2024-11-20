import { useState, useEffect } from "react";
import { RecordValueGroup, DayjsType, ValueGroup } from "@shared/ui/Filter/model/types/valueGroup";
import dayjs from "dayjs";

const convertDateRange = (dateRange: DayjsType) => ({
    createdAfter: dateRange[0] ? dayjs(dateRange[0]).format("YYYY-MM-DD") : null,
    createdBefore: dateRange[1] ? dayjs(dateRange[1]).format("YYYY-MM-DD") : null,
});

export const useFilterState = (initialFilters: RecordValueGroup) => {
    const [selectedFilters, setSelectedFilters] = useState(initialFilters);
    useEffect(() => {
        if (Array.isArray(initialFilters.dateRange)) {
            const [start, end] = initialFilters.dateRange as [string | null, string | null];
            setSelectedFilters((prevFilters) => ({
                ...prevFilters,
                dateRange: [start ? dayjs(start) : null, end ? dayjs(end) : null],
            }));
        }
    }, [initialFilters]);

    const handleFilterChange = (key: string, value: ValueGroup) => {
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const applyFilters = () => {
        const filtersToApply = { ...selectedFilters };
        if (filtersToApply.dateRange) {
            Object.assign(filtersToApply, convertDateRange(filtersToApply.dateRange as DayjsType));
            delete filtersToApply.dateRange;
        }
        return filtersToApply;
    };

    const resetFilters = () => setSelectedFilters({});

    return { selectedFilters, handleFilterChange, applyFilters, resetFilters };
};

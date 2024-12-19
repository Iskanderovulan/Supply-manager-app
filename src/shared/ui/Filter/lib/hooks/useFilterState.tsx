import { useState } from "react";
import { RecordValueGroup, ValueGroup } from "@shared/ui/Filter/model/types/valueGroup";

export const useFilterState = (initialFilters: RecordValueGroup) => {
    const [selectedFilters, setSelectedFilters] = useState(initialFilters);

    const handleFilterChange = (key: string, value: ValueGroup) => {
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const applyFilters = () => {
        return { ...selectedFilters };
    };

    const resetFilters = () => setSelectedFilters({});

    return { selectedFilters, handleFilterChange, applyFilters, resetFilters };
};

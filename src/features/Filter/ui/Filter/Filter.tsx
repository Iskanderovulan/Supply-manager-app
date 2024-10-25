import { useState, useEffect, useCallback } from "react";
import { Button } from "antd";
import { FilterDrawer } from "../FilterDrawer/FilterDrawer";
import { FilterConfig } from "../../model/types/filterConfig";
import { ValueGroup, DayjsType } from "@features/Filter/model/types/valueGroup";
import { useModal } from "@shared/lib/hooks/useModal/useModal";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import dayjs from "dayjs";

interface FilterProps<TFilters> {
    filters: FilterConfig[];
    onApply: (selectedFilters: Record<string, ValueGroup>) => void;
    onReset: () => void;
    initialFilters: TFilters;
}

export const Filter = <TFilters extends Record<string, unknown>>(props: FilterProps<TFilters>) => {
    const { filters, onApply, onReset, initialFilters } = props;

    const { t } = useTranslation(TranslationId.FILTER);
    const { isModalOpen, showModal, hideModal } = useModal();

    const [selectedFilters, setSelectedFilters] = useState<Record<string, ValueGroup>>(
        initialFilters as Record<string, ValueGroup>,
    );
    useEffect(() => {
        if (Array.isArray(initialFilters.dateRange)) {
            const [start, end] = initialFilters.dateRange as [string | null, string | null];
            setSelectedFilters((prevFilters) => ({
                ...prevFilters,
                dateRange: [start ? dayjs(start) : null, end ? dayjs(end) : null],
            }));
        }
    }, [initialFilters]);

    const convertDateRange = (dateRange: DayjsType) => ({
        createdAfter: dateRange[0] ? dateRange[0].toISOString() : null,
        createdBefore: dateRange[1] ? dateRange[1].toISOString() : null,
    });

    const handleFilterChange = useCallback((key: string, value: ValueGroup) => {
        setSelectedFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    }, []);

    const handleApplyFilters = useCallback(() => {
        const filtersToApply = { ...selectedFilters };

        if (filtersToApply.dateRange) {
            Object.assign(filtersToApply, convertDateRange(filtersToApply.dateRange as DayjsType));
            delete filtersToApply.dateRange;
        }

        onApply(filtersToApply);
        hideModal();
    }, [selectedFilters, onApply, hideModal]);

    const handleResetFilters = useCallback(() => {
        setSelectedFilters({});
        onReset();
    }, [onReset]);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {t("openFilters")}
            </Button>
            <FilterDrawer
                visible={isModalOpen}
                closeDrawer={hideModal}
                filters={filters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                t={t}
            />
        </>
    );
};

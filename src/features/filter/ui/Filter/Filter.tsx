import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import { TranslationId } from "@shared/const/translation";
import { FilterDrawer } from "../FilterDrawer/FilterDrawer";
import { FilterConfig } from "../../model/types/filterConfig";
import { useFilterState } from "../../lib/useFilterState";
import { RecordValueGroup } from "../../model/types/valueGroup";

interface FilterProps<TFilters> {
    filters: FilterConfig[];
    onApply: (selectedFilters: RecordValueGroup) => void;
    onReset: () => void;
    initialFilters: TFilters;
}

export const Filter = <TFilters extends Record<string, unknown>>({
    filters,
    onApply,
    onReset,
    initialFilters,
}: FilterProps<TFilters>) => {
    const { t } = useTranslation(TranslationId.FILTER);
    const { isModalOpen, showModal, hideModal } = useModal();
    const { selectedFilters, handleFilterChange, applyFilters, resetFilters } = useFilterState(
        initialFilters as RecordValueGroup,
    );

    const handleApplyFilters = () => {
        const filters = applyFilters();
        onApply(filters);
        hideModal();
    };

    const handleResetFilters = () => {
        resetFilters();
        onReset();
    };

    return (
        <>
            <Button type="primary" onClick={showModal} icon={<FilterOutlined />}>
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

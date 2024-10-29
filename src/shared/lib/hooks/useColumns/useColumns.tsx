import { useState, useMemo, useEffect } from "react";
import { Column } from "@shared/types/column";

export const useColumns = <T,>(allColumns: Column<T>[]) => {
    const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
        const savedColumns = localStorage.getItem("visibleColumns");
        return savedColumns ? JSON.parse(savedColumns) : allColumns.map((col) => col.key);
    });

    useEffect(() => {
        localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    const columnsConfig = useMemo(
        () => allColumns.map(({ key, title }) => ({ key, title })),
        [allColumns],
    );

    const filteredColumns = useMemo(
        () => allColumns.filter((column) => visibleColumns.includes(column.key)),
        [allColumns, visibleColumns],
    );

    return { columnsConfig, visibleColumns, setVisibleColumns, filteredColumns };
};

import { useState, useMemo, useEffect } from "react";
import { Column } from "@shared/types/column";

export const useColumns = <T,>(allColumns: Column<T>[], storageKey: string) => {
    const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
        const savedColumns = localStorage.getItem("visibleColumns");
        const columnsState = savedColumns ? JSON.parse(savedColumns) : {};
        return columnsState[storageKey] || allColumns.map((col) => col.key);
    });

    useEffect(() => {
        const savedColumns = localStorage.getItem("visibleColumns");
        const columnsState = savedColumns ? JSON.parse(savedColumns) : {};
        columnsState[storageKey] = visibleColumns;
        localStorage.setItem("visibleColumns", JSON.stringify(columnsState));
    }, [visibleColumns, storageKey]);

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

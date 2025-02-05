import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useColumns } from "./useColumns";
import { Column } from "@shared/types/column";

const mockColumns: Column<{ key: string }>[] = [
    { key: "col1", title: "Column 1", dataIndex: "col1" },
    { key: "col2", title: "Column 2", dataIndex: "col2" },
    { key: "col3", title: "Column 3", dataIndex: "col3" },
];

const mockStorageKey = "testStorageKey";

describe("useColumns", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should initialize visible columns from localStorage if available", () => {
        const savedState = {
            [mockStorageKey]: ["col1", "col2"],
        };
        localStorage.setItem("visibleColumns", JSON.stringify(savedState));

        const { result } = renderHook(() => useColumns(mockColumns, mockStorageKey));

        expect(result.current.visibleColumns).toEqual(["col1", "col2"]);
        expect(result.current.filteredColumns).toHaveLength(2);
    });

    it("should initialize visible columns to all columns if localStorage is empty", () => {
        const { result } = renderHook(() => useColumns(mockColumns, mockStorageKey));

        expect(result.current.visibleColumns).toEqual(["col1", "col2", "col3"]);
        expect(result.current.filteredColumns).toHaveLength(3);
    });

    it("should update localStorage when visible columns change", () => {
        const { result } = renderHook(() => useColumns(mockColumns, mockStorageKey));

        act(() => {
            result.current.setVisibleColumns(["col1", "col3"]);
        });

        const savedState = JSON.parse(localStorage.getItem("visibleColumns") || "{}");
        expect(savedState[mockStorageKey]).toEqual(["col1", "col3"]);
    });

    it("should return a valid columnsConfig mapping keys to titles", () => {
        const { result } = renderHook(() => useColumns(mockColumns, mockStorageKey));

        expect(result.current.columnsConfig).toEqual([
            { key: "col1", title: "Column 1" },
            { key: "col2", title: "Column 2" },
            { key: "col3", title: "Column 3" },
        ]);
    });

    it("should filter columns based on visibleColumns state", () => {
        const { result } = renderHook(() => useColumns(mockColumns, mockStorageKey));

        act(() => {
            result.current.setVisibleColumns(["col2"]);
        });

        expect(result.current.filteredColumns).toEqual([
            { key: "col2", title: "Column 2", dataIndex: "col2" },
        ]);
    });

    it("should persist changes to visibleColumns across renders", () => {
        const { result, rerender } = renderHook(() => useColumns(mockColumns, mockStorageKey));

        act(() => {
            result.current.setVisibleColumns(["col3"]);
        });

        rerender();

        expect(result.current.visibleColumns).toEqual(["col3"]);
    });
});

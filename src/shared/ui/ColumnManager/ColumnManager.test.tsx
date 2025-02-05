import { render, fireEvent } from "@testing-library/react";
import { ColumnManager } from "./ColumnManager";
import { describe, it, vi, expect, beforeEach } from "vitest";

const mockColumnsConfig = [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    { key: "address", title: "Address" },
];

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
        getPropertyValue: () => "none",
    }),
});

const mockVisibleColumns = ["name", "age"];
const mockOnVisibleColumnsChange = vi.fn();

describe("ColumnManager", () => {
    beforeEach(() => {
        mockOnVisibleColumnsChange.mockClear();
    });

    it("calls onVisibleColumnsChange with selected columns when checkboxes change", () => {
        const { getByTestId, getByLabelText } = render(
            <ColumnManager
                columnsConfig={mockColumnsConfig}
                visibleColumns={mockVisibleColumns}
                onVisibleColumnsChange={mockOnVisibleColumnsChange}
            />,
        );

        fireEvent.click(getByTestId("manage-columns-button"));
        fireEvent.click(getByLabelText("Address"));
        expect(mockOnVisibleColumnsChange).toHaveBeenCalledWith(["name", "age", "address"]);
    });

    it("selects all columns when Select All is clicked", () => {
        const { getByTestId } = render(
            <ColumnManager
                columnsConfig={mockColumnsConfig}
                visibleColumns={mockVisibleColumns}
                onVisibleColumnsChange={mockOnVisibleColumnsChange}
            />,
        );

        fireEvent.click(getByTestId("manage-columns-button"));
        fireEvent.click(getByTestId("select-all-button"));
        expect(mockOnVisibleColumnsChange).toHaveBeenCalledWith(["name", "age", "address"]);
    });

    it("deselects all columns when Deselect All is clicked", () => {
        const { getByTestId } = render(
            <ColumnManager
                columnsConfig={mockColumnsConfig}
                visibleColumns={mockVisibleColumns}
                onVisibleColumnsChange={mockOnVisibleColumnsChange}
            />,
        );

        fireEvent.click(getByTestId("manage-columns-button"));
        fireEvent.click(getByTestId("deselect-all-button"));
        expect(mockOnVisibleColumnsChange).toHaveBeenCalledWith([]);
    });

    it("closes the modal when OK is clicked", () => {
        const { getByTestId } = render(
            <ColumnManager
                columnsConfig={mockColumnsConfig}
                visibleColumns={mockVisibleColumns}
                onVisibleColumnsChange={mockOnVisibleColumnsChange}
            />,
        );

        fireEvent.click(getByTestId("manage-columns-button"));
        fireEvent.click(getByTestId("ok-button"));

        expect(mockOnVisibleColumnsChange).toHaveBeenCalledTimes(0);
    });
});

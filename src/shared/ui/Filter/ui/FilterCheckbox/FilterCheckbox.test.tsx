import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { mockT } from "@shared/lib/tests/mockT";
import { FilterCheckbox } from "./FilterCheckbox";
import { FilterConfig } from "../../model/types/filterConfig";
import { Value } from "../../model/types/valueGroup";
import { FilterType } from "../../model/types/filterConfig";

const mockFilter: FilterConfig = {
    label: "testFilter",
    key: "testFilter",
    type: FilterType.Checkbox,
    options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ],
};

const mockSelectedValue: Value = ["option1"];
const mockOnChange = vi.fn();

describe("FilterCheckbox", () => {
    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it("renders the correct number of options by default", () => {
        const { getAllByRole } = render(
            <FilterCheckbox
                filter={mockFilter}
                selectedValue={mockSelectedValue}
                onChange={mockOnChange}
                t={mockT}
            />,
        );

        const checkboxes = getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(mockFilter.options?.length || 0);
    });

    it("calls onChange when a checkbox is clicked", () => {
        const { getByLabelText } = render(
            <FilterCheckbox
                filter={mockFilter}
                selectedValue={mockSelectedValue}
                onChange={mockOnChange}
                t={mockT}
            />,
        );

        fireEvent.click(getByLabelText("Option 2"));
        expect(mockOnChange).toHaveBeenCalledWith(["option1", "option2"]);
    });

    it("selects all options when 'Select All' is clicked", () => {
        const { getByTestId } = render(
            <FilterCheckbox
                filter={mockFilter}
                selectedValue={mockSelectedValue}
                onChange={mockOnChange}
                t={mockT}
            />,
        );

        fireEvent.click(getByTestId("select-all-button"));
        const allValues = mockFilter.options?.map((option) => option.value) || [];
        expect(mockOnChange).toHaveBeenCalledWith(allValues);
    });

    it("resets all options when 'Reset' is clicked", () => {
        const { getByTestId } = render(
            <FilterCheckbox
                filter={mockFilter}
                selectedValue={mockSelectedValue}
                onChange={mockOnChange}
                t={mockT}
            />,
        );

        fireEvent.click(getByTestId("reset-button"));
        expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it("toggles between 'show all' and 'hide all'", () => {
        const { getByTestId, getAllByRole } = render(
            <FilterCheckbox
                filter={{
                    ...mockFilter,
                    options: Array.from({ length: 15 }, (_, i) => ({
                        label: `Option ${i + 1}`,
                        value: `option${i + 1}`,
                    })),
                }}
                selectedValue={mockSelectedValue}
                onChange={mockOnChange}
                t={mockT}
            />,
        );

        fireEvent.click(getByTestId("toggle-show-button"));
        const allCheckboxes = getAllByRole("checkbox");
        expect(allCheckboxes).toHaveLength(15);

        fireEvent.click(getByTestId("toggle-show-button"));
        const limitedCheckboxes = getAllByRole("checkbox");
        expect(limitedCheckboxes).toHaveLength(10);
    });
});

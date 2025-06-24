import { render, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { FilterRange } from "./FilterRange";
import { mockT } from "@shared/lib/tests/mockT";

const mockOnChange = vi.fn();

describe("FilterRange", () => {
    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it("calls onChange with correct values when reset is clicked", () => {
        const { getByText } = render(
            <FilterRange
                selectedValue={[10, 50]}
                onChange={mockOnChange}
                t={mockT}
                min={0}
                max={100}
            />,
        );

        const resetButton = getByText("reset");
        fireEvent.click(resetButton);

        expect(mockOnChange).toHaveBeenCalledWith([0, 0]);
    });

    it("respects min and max props", () => {
        const { getByText } = render(
            <FilterRange
                selectedValue={[0, 100]}
                onChange={mockOnChange}
                t={mockT}
                min={0}
                max={100}
            />,
        );

        expect(getByText("reset")).toBeInTheDocument();
    });

    it("handles no selected value correctly", () => {
        const { getByText } = render(
            <FilterRange
                selectedValue={null}
                onChange={mockOnChange}
                t={mockT}
                min={0}
                max={100}
            />,
        );

        const resetButton = getByText("reset");
        fireEvent.click(resetButton);

        expect(mockOnChange).toHaveBeenCalledWith([0, 0]);
    });
});

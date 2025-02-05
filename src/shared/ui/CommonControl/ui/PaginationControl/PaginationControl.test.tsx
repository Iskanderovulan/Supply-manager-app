import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { PaginationControl } from "./PaginationControl";

vi.mock("antd", () => ({
    Pagination: vi.fn(() => <div data-testid="mocked-pagination">Mocked Pagination</div>),
}));

describe("PaginationControl and CustomPagination integration test", () => {
    it("should render CustomPagination with correct props", () => {
        const updateSearchParamsMock = vi.fn();

        render(
            <PaginationControl
                totalPages={5}
                updateSearchParams={updateSearchParamsMock}
                totalResults={50}
                currentPage={1}
                pageSize={10}
            />,
        );

        const pagination = screen.getByTestId("mocked-pagination");
        expect(pagination).toBeInTheDocument();
    });

    it("should call updateSearchParams with correct page on page change", () => {
        const updateSearchParamsMock = vi.fn();

        render(
            <PaginationControl
                totalPages={5}
                updateSearchParams={updateSearchParamsMock}
                totalResults={50}
                currentPage={1}
                pageSize={10}
            />,
        );

        // Вызываем onPageChange с тестовыми данными
        updateSearchParamsMock({ page: 2 });

        expect(updateSearchParamsMock).toHaveBeenCalledWith({ page: 2 });
    });

    it("should not render CustomPagination when totalPages is 1", () => {
        const updateSearchParamsMock = vi.fn();

        render(
            <PaginationControl
                totalPages={1}
                updateSearchParams={updateSearchParamsMock}
                totalResults={10}
                currentPage={1}
                pageSize={10}
            />,
        );

        const pagination = screen.queryByTestId("mocked-pagination");
        expect(pagination).not.toBeInTheDocument();
    });
});

import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { useFilterSearchParams } from "./useFilterSearchParams";

describe("useFilterSearchParams", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter>{children}</MemoryRouter>
    );

    it("should return the correct search param", () => {
        const { result } = renderHook(() => useFilterSearchParams(), { wrapper });

        act(() => {
            result.current.updateSearchParams({ name: "ProductName" });
        });

        expect(result.current.getSearchParam("name")).toBe("ProductName");
    });

    it("should return an array of search params for the specified key", () => {
        const { result } = renderHook(() => useFilterSearchParams(), { wrapper });

        act(() => {
            result.current.updateSearchParams({ materialIds: ["material1", "material2"] });
        });

        expect(result.current.getSearchParam("materialIds", true)).toEqual([
            "material1",
            "material2",
        ]);
    });

    it("should update search params with replacement", () => {
        const { result } = renderHook(() => useFilterSearchParams(), { wrapper });

        act(() => {
            result.current.updateSearchParams({ sortBy: "price", priceMin: "10" });
        });

        expect(result.current.getSearchParam("sortBy")).toBe("price");
        expect(result.current.getSearchParam("priceMin")).toBe("10");
    });

    it("should delete a search param when updated with null or undefined", () => {
        const { result } = renderHook(() => useFilterSearchParams(), { wrapper });

        act(() => {
            result.current.updateSearchParams({ page: "1" });
        });

        expect(result.current.getSearchParam("page")).toBe("1");

        act(() => {
            result.current.updateSearchParams({ page: null });
        });

        expect(result.current.getSearchParam("page")).toBe("");
    });

    it("should decode a search param value", () => {
        const { result } = renderHook(() => useFilterSearchParams(), { wrapper });

        act(() => {
            result.current.updateSearchParams({ search: "hello%20world" });
        });

        expect(result.current.getDecodedParam("search")).toBe("hello world");
    });
});

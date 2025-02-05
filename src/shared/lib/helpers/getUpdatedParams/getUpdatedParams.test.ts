import { describe, it, expect } from "vitest";
import { getUpdatedParams } from "./getUpdatedParams";
import { FilterKeys } from "@shared/ui/CommonControl";

describe("getUpdatedParams", () => {
    it("should map selected filters to updated params based on filter mapping", () => {
        const selectedFilters = {
            [FilterKeys.NAME]: "Wood",
            [FilterKeys.MATERIAL_IDS]: ["mat1", "mat2"],
            [FilterKeys.PRICE_MIN]: "10",
        };

        const filterMapping = {
            [FilterKeys.NAME]: "paramName",
            [FilterKeys.MATERIAL_IDS]: "paramMaterials",
            [FilterKeys.PRICE_MIN]: "paramPriceMin",
        };

        const result = getUpdatedParams(selectedFilters, filterMapping);

        expect(result).toEqual({
            page: null,
            paramName: "Wood",
            paramMaterials: ["mat1", "mat2"],
            paramPriceMin: "10",
        });
    });

    it("should set param to null if filter is not present in selected filters", () => {
        const selectedFilters = {
            [FilterKeys.NAME]: "Metal",
        };

        const filterMapping = {
            [FilterKeys.NAME]: "paramName",
            [FilterKeys.LIMIT]: "paramLimit",
        };

        const result = getUpdatedParams(selectedFilters, filterMapping);

        expect(result).toEqual({
            page: null,
            paramName: "Metal",
            paramLimit: null,
        });
    });

    it("should handle empty selected filters and filter mapping", () => {
        const selectedFilters = {};
        const filterMapping = {};

        const result = getUpdatedParams(selectedFilters, filterMapping);

        expect(result).toEqual({ page: null });
    });

    it("should return default page null even if no filters are passed", () => {
        const selectedFilters = {};
        const filterMapping = {
            [FilterKeys.NAME]: "paramName",
        };

        const result = getUpdatedParams(selectedFilters, filterMapping);

        expect(result).toEqual({
            page: null,
            paramName: null,
        });
    });

    it("should handle multiple filters correctly", () => {
        const selectedFilters = {
            [FilterKeys.PRICE_MAX]: "200",
            [FilterKeys.INTENSITY]: "high",
        };

        const filterMapping = {
            [FilterKeys.PRICE_MAX]: "paramPriceMax",
            [FilterKeys.INTENSITY]: "paramIntensity",
            [FilterKeys.HARDNESS]: "paramHardness",
        };

        const result = getUpdatedParams(selectedFilters, filterMapping);

        expect(result).toEqual({
            page: null,
            paramPriceMax: "200",
            paramIntensity: "high",
            paramHardness: null,
        });
    });
});

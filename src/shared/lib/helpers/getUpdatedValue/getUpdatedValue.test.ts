import { describe, it, expect } from "vitest";
import { getUpdatedValue } from "./getUpdatedValue";

describe("getUpdatedValue", () => {
    it("should return null if newValue is equal to defaultValue", () => {
        const newValue = "default";
        const defaultValue = "default";

        const result = getUpdatedValue(newValue, defaultValue);

        expect(result).toBeNull();
    });

    it("should return newValue if it is not equal to defaultValue", () => {
        const newValue = "newValue";
        const defaultValue = "default";

        const result = getUpdatedValue(newValue, defaultValue);

        expect(result).toBe(newValue);
    });

    it("should handle numbers correctly", () => {
        const newValue = 10;
        const defaultValue = 5;

        const result = getUpdatedValue(newValue, defaultValue);

        expect(result).toBe(newValue);
    });

    it("should return null for numbers if newValue equals defaultValue", () => {
        const newValue = 5;
        const defaultValue = 5;

        const result = getUpdatedValue(newValue, defaultValue);

        expect(result).toBeNull();
    });

    it("should return null for undefined values if both are undefined", () => {
        const newValue = undefined;
        const defaultValue = undefined;

        const result = getUpdatedValue(newValue, defaultValue);

        expect(result).toBeNull();
    });
});

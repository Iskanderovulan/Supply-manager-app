import { namePattern } from "./authValidators";
import { describe, it, expect } from "vitest";

describe("namePattern", () => {
    it("should match valid names", () => {
        const validNames = [
            "John Doe",
            "Jane",
            "Alice Smith",
            "Anna-Marie",
            "O'Connor",
            "Jean-Claude",
        ];

        validNames.forEach((name) => {
            expect(namePattern.test(name)).toBe(true);
        });
    });

    it("should not match invalid names", () => {
        const invalidNames = [
            "J",
            "ThisNameIsWayTooLongToBeValidForTestingPurposes",
            "1234",
            "John@Doe",
            "Anna_Marie",
            "Élise",
            "    ",
            "",
        ];

        invalidNames.forEach((name) => {
            expect(namePattern.test(name)).toBe(false);
        });
    });

    it("should handle edge cases", () => {
        expect(namePattern.test("John")).toBe(true);
        expect(namePattern.test("Anna-Marie")).toBe(true);
        expect(namePattern.test("O'Connor")).toBe(true);
        expect(namePattern.test("123")).toBe(false);
        expect(namePattern.test("John@Doe")).toBe(false);
        expect(namePattern.test("Élise")).toBe(false);
    });
});

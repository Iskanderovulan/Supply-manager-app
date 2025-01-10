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
            "J", // меньше 2 символов
            "ThisNameIsWayTooLongToBeValidForTestingPurposes", // больше 30 символов
            "1234", // числа
            "John@Doe", // спецсимволы
            "Anna_Marie", // подчеркивание
            "Élise", // не латинская буква
            "    ", // только пробелы
            "", // пустая строка
        ];

        invalidNames.forEach((name) => {
            expect(namePattern.test(name)).toBe(false);
        });
    });

    it("should handle edge cases", () => {
        expect(namePattern.test("John")).toBe(true); // простой валидный
        expect(namePattern.test("Anna-Marie")).toBe(true); // дефис
        expect(namePattern.test("O'Connor")).toBe(true); // апостроф
        expect(namePattern.test("123")).toBe(false); // числа
        expect(namePattern.test("John@Doe")).toBe(false); // спецсимволы
        expect(namePattern.test("Élise")).toBe(false); // не латинский символ
    });
});

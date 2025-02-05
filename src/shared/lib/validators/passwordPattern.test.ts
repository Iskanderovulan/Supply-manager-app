import { passwordPattern } from "./authValidators";
import { describe, it, expect } from "vitest";

describe("passwordPattern", () => {
    it("should match valid passwords", () => {
        const validPasswords = [
            "Password1!",
            "Strong@Pass2",
            "Valid$Password9",
            "A@1b2c3d4e5f",
            "P@$$w0rd!",
            "Pass123@!",
        ];

        validPasswords.forEach((password) => {
            expect(passwordPattern.test(password)).toBe(true);
        });
    });

    it("should not match invalid passwords", () => {
        const invalidPasswords = [
            "password",
            "Password",
            "password1",
            "PASSWORD1",
            "Pass!word",
            "12345678",
            "!@#$%^&*",
            "Short1!",
            "NoSpecialChar9",
            "noDigitsOnly!",
        ];

        invalidPasswords.forEach((password) => {
            expect(passwordPattern.test(password)).toBe(false);
        });
    });

    it("should handle edge cases", () => {
        expect(passwordPattern.test("")).toBe(false);
        expect(passwordPattern.test(" ")).toBe(false);
        expect(passwordPattern.test("Password123!")).toBe(true);
        expect(passwordPattern.test("password1!")).toBe(false);
        expect(passwordPattern.test("PASSWORD1!")).toBe(false);
        expect(passwordPattern.test("Pass1")).toBe(false);
        expect(passwordPattern.test("Passw@1 ")).toBe(false);
    });
});

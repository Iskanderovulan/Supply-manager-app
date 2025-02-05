import { describe, it, expect } from "vitest";
import { emailPattern } from "./authValidators";

describe("emailPattern", () => {
    it("should match valid email addresses", () => {
        const validEmails = [
            "user@example.com",
            "user.name@example.com",
            "user_name@example.com",
            "user+name@example.com",
            "user-name@example.com",
            "user123@example.com",
            "123user@example.com",
            "user@example.co.uk",
            "user@sub.domain.com",
            "user@123.com",
            "user@domain.info",
            "user@domain.travel",
        ];

        validEmails.forEach((email) => {
            expect(emailPattern.test(email)).toBe(true);
        });
    });

    it("should not match invalid email addresses", () => {
        const invalidEmails = [
            "user@.com",
            "@example.com",
            "user@",
            "user@domain..com",
            "user@domain.",
            "user@domain.c",
            "plainaddress",
            "user@domain..com",
            "user@domain.com.",
            "user@-domain.com",
            "user@domain-.com",
            "user@.domain.com",
        ];

        invalidEmails.forEach((email) => {
            expect(emailPattern.test(email)).toBe(false);
        });
    });

    it("should handle edge cases", () => {
        expect(emailPattern.test("")).toBe(false);
        expect(emailPattern.test(" ")).toBe(false);
        expect(emailPattern.test("user@.com")).toBe(false);
        expect(emailPattern.test("@example.com")).toBe(false);
        expect(emailPattern.test("user@domain..com")).toBe(false);
        expect(emailPattern.test("user@domain.c")).toBe(false);
        expect(emailPattern.test("user@domain.com.")).toBe(false);
    });
});

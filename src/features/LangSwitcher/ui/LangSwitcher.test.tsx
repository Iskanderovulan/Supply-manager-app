import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { LangSwitcher } from "./LangSwitcher";

const mockI18n = {
    language: "en",
    changeLanguage: vi.fn((lang) => {
        mockI18n.language = lang;
        return Promise.resolve();
    }),
    t: vi.fn((key) => (key === "switcher" ? "Switch Language" : key)),
};

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: mockI18n.t,
        i18n: mockI18n,
    }),
}));

describe("LangSwitcher", () => {
    it("should render LangSwitcher button", () => {
        render(<LangSwitcher />);
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("Switch Language")).toBeInTheDocument();
    });

    it("should toggle language on button click", async () => {
        render(<LangSwitcher />);

        const button = screen.getByRole("button");

        expect(mockI18n.language).toBe("en");

        await userEvent.click(button);

        expect(mockI18n.changeLanguage).toHaveBeenCalledWith("ru");
        expect(mockI18n.language).toBe("ru");

        await userEvent.click(button);

        expect(mockI18n.changeLanguage).toHaveBeenCalledWith("en");
        expect(mockI18n.language).toBe("en");
    });
});

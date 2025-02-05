import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useTheme } from "@app/providers/theme/ThemeProvider";
import { Theme } from "@shared/types/theme";

type MockedFunctionType = ReturnType<typeof vi.fn>;

vi.mock("@app/providers/theme/ThemeProvider", () => ({
    useTheme: vi.fn(),
    Theme: {
        LIGHT: "light",
        DARK: "dark",
    },
}));

describe("ThemeSwitcher", () => {
    it("should render ThemeSwitcher with the correct initial theme", () => {
        (useTheme as MockedFunctionType).mockReturnValue({
            theme: Theme.DARK,
            toggleTheme: vi.fn(),
        });

        render(<ThemeSwitcher />);

        const switchElement = screen.getByRole("switch");
        expect(switchElement).toBeInTheDocument();
        expect(switchElement).toBeChecked();
    });

    it("should display the correct icon based on the theme", () => {
        (useTheme as MockedFunctionType).mockReturnValue({
            theme: Theme.LIGHT,
            toggleTheme: vi.fn(),
        });

        render(<ThemeSwitcher />);

        const bulbIcon = screen.getByRole("img", { name: /bulb/i });
        expect(bulbIcon).toBeInTheDocument();
    });

    it("should toggle theme when the switch is clicked", async () => {
        const toggleThemeMock = vi.fn();
        (useTheme as MockedFunctionType).mockReturnValue({
            theme: Theme.LIGHT,
            toggleTheme: toggleThemeMock,
        });

        render(<ThemeSwitcher />);

        const switchElement = screen.getByRole("switch");
        expect(switchElement).not.toBeChecked();

        await userEvent.click(switchElement);

        expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ThemeProvider from "./ThemeProvider";
import { ThemeContext, Theme } from "../lib/ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from "@shared/const/localstorage";
import userEvent from "@testing-library/user-event";
import { mockLocalStorage } from "@shared/lib/tests/mockLocalStorage";

global.localStorage = mockLocalStorage;

describe("ThemeProvider", () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    it("should provide context to child components", () => {
        render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {(value) => <div>Theme: {value.theme}</div>}
                </ThemeContext.Consumer>
            </ThemeProvider>,
        );

        expect(screen.getByText(/Theme:/)).toBeInTheDocument();
    });

    it("should initialize theme from localStorage", () => {
        mockLocalStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);
        expect(mockLocalStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(Theme.LIGHT);
    });

    it("should update document body attributes when theme changes", async () => {
        let contextValue;
        render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return (
                            <button onClick={() => value.setTheme!(Theme.LIGHT)}>
                                Change Theme
                            </button>
                        );
                    }}
                </ThemeContext.Consumer>
            </ThemeProvider>,
        );

        expect(contextValue!.theme).toBe(Theme.DARK);

        const button = screen.getByRole("button", { name: /Change Theme/i });
        await userEvent.click(button);

        expect(contextValue!.theme).toBe(Theme.LIGHT);
        expect(document.body.getAttribute("data-theme")).toBe(Theme.LIGHT);
    });
});

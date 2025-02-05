import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CollapseProvider } from "./CollapseProvider";
import { CollapseContext } from "../lib/collapseContext";
import { LOCAL_STORAGE_COLLAPSED_KEY } from "@shared/const/localstorage";
import userEvent from "@testing-library/user-event";
import { mockLocalStorage } from "@shared/lib/tests/mockLocalStorage";

global.localStorage = mockLocalStorage;

describe("CollapseProvider", () => {
    beforeEach(() => {
        mockLocalStorage.clear();
    });

    it("should initialize collapsed state from localStorage", () => {
        mockLocalStorage.setItem(LOCAL_STORAGE_COLLAPSED_KEY, "true");

        let contextValue;
        render(
            <CollapseProvider>
                <CollapseContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return null;
                    }}
                </CollapseContext.Consumer>
            </CollapseProvider>,
        );

        expect(contextValue!.collapsed).toBe(true);
    });

    it("should toggle collapsed state and update localStorage", async () => {
        mockLocalStorage.setItem(LOCAL_STORAGE_COLLAPSED_KEY, "false");

        let contextValue;
        render(
            <CollapseProvider>
                <CollapseContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return <button onClick={value?.toggleCollapse}>Toggle</button>;
                    }}
                </CollapseContext.Consumer>
            </CollapseProvider>,
        );

        expect(contextValue!.collapsed).toBe(false);
        const button = screen.getByRole("button", { name: /toggle/i });

        await userEvent.click(button);

        expect(contextValue!.collapsed).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith(LOCAL_STORAGE_COLLAPSED_KEY, "true");
    });

    it("should provide context to child components", () => {
        render(
            <CollapseProvider>
                <CollapseContext.Consumer>
                    {(value) => <div>Collapsed: {String(value?.collapsed)}</div>}
                </CollapseContext.Consumer>
            </CollapseProvider>,
        );

        expect(screen.getByText(/Collapsed:/)).toBeInTheDocument();
    });
});

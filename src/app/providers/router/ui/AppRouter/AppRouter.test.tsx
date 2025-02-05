import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@app/store/store";
import { ThemeProvider } from "@app/providers/theme/ThemeProvider";
import { CollapseProvider } from "@app/providers/CollapseProvider";
import { I18nextProvider } from "react-i18next";
import { i18nForTests } from "@shared/config/i18n/i18nForTests";
import AppRouter from "./AppRouter";
import {
    getRouteChart,
    getRouteDetails,
    getRouteLogin,
    getRouteRegister,
} from "@shared/const/router";
import { describe, vi, it, expect } from "vitest";

vi.mock("@shared/ui/ProtectedRoute", () => ({
    ProtectedRoute: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@pages/ChartPage", () => ({
    ChartPage: () => <div>Chart Page Content</div>,
}));

vi.mock("@pages/NotFoundPage", () => ({
    NotFoundPage: () => <div>Not Found Page</div>,
}));

vi.mock("@pages/DetailsPage", () => ({
    DetailsPage: () => <div>Details Page Content</div>,
}));

describe("AppRouter", () => {
    const renderWithProviders = (initialEntries: string[]) =>
        render(
            <MemoryRouter initialEntries={initialEntries}>
                <Provider store={store}>
                    <I18nextProvider i18n={i18nForTests}>
                        <ThemeProvider>
                            <CollapseProvider>
                                <AppRouter />
                            </CollapseProvider>
                        </ThemeProvider>
                    </I18nextProvider>
                </Provider>
            </MemoryRouter>,
        );

    it("should render NotFoundPage for undefined routes", () => {
        renderWithProviders(["/some-undefined-route"]);

        expect(screen.getByText("Not Found Page")).toBeInTheDocument();
    });

    it("should show ChartPage content for /chart route", async () => {
        renderWithProviders([getRouteChart()]);

        await waitFor(() => {
            expect(screen.getByText("Chart Page Content")).toBeInTheDocument();
        });
    });

    it("should render DetailsPage with dynamic id", async () => {
        renderWithProviders([getRouteDetails("123")]);

        await waitFor(() => {
            expect(screen.getByText("Details Page Content")).toBeInTheDocument();
        });
    });

    it("should render LoginPage for /login route", async () => {
        renderWithProviders([getRouteLogin()]);

        await waitFor(() => {
            expect(screen.getByText(/login/i)).toBeInTheDocument();
        });
    });

    it("should render RegisterPage for /register route", async () => {
        renderWithProviders([getRouteRegister()]);

        await waitFor(() => {
            expect(screen.getByText(/register/i)).toBeInTheDocument();
        });
    });
});

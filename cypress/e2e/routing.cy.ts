import {
    getRouteProduct,
    getRouteLogin,
    getRouteRegister,
    getRouteMaterial,
    getRouteColor,
    getRoutePack,
    getRouteProfile,
    getRouteChart,
} from "@shared/const/router";

describe("App Routing", () => {
    it("should redirect unauthenticated users to /login when accessing protected routes", () => {
        const protectedRoutes = [
            getRouteProduct(),
            getRouteMaterial(),
            getRouteColor(),
            getRoutePack(),
            getRouteProfile(),
            getRouteChart(),
        ];

        protectedRoutes.forEach((route) => {
            cy.visit(route);
            cy.url().should("include", getRouteLogin());
        });
    });

    it("should allow authenticated users to access protected routes", () => {
        cy.login("admin@gmail.com", "Qwerty1!");

        const protectedRoutes = [
            { path: getRouteProduct(), testId: "ProductWidget" },
            { path: getRouteMaterial(), testId: "MaterialWidget" },
            { path: getRouteColor(), testId: "ColorWidget" },
            { path: getRoutePack(), testId: "PackWidget" },
            { path: getRouteProfile(), testId: "ProfileWidget" },
            { path: getRouteChart(), testId: "ChartWidget" },
        ];

        protectedRoutes.forEach(({ path, testId }) => {
            cy.visit(path);
            cy.getByTestId(testId).should("exist");
        });
    });

    it("should allow unauthenticated users to visit login and register Widgets", () => {
        const publicRoutes = [
            { path: getRouteLogin(), testId: "LoginForm" },
            { path: getRouteRegister(), testId: "RegisterForm" },
        ];

        publicRoutes.forEach(({ path, testId }) => {
            cy.visit(path);
            cy.getByTestId(testId).should("exist");
        });
    });

    it("should redirect authenticated users away from login/register", () => {
        cy.login("admin@gmail.com", "Qwerty1!");

        cy.visit(getRouteLogin());
        cy.url().should("not.include", getRouteLogin());

        cy.visit(getRouteRegister());
        cy.url().should("not.include", getRouteRegister());
    });

    it("should show 404 Page for invalid routes", () => {
        cy.visit("/invalid-route");
        cy.getByTestId("NotFoundPage").should("exist");
    });
});

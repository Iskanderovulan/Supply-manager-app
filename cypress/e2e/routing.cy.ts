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
            getRouteProduct(),
            getRouteMaterial(),
            getRouteColor(),
            getRoutePack(),
            getRouteProfile(),
            getRouteChart(),
        ];

        protectedRoutes.forEach((path) => {
            cy.visit(path);
            cy.url().should("include", path);
        });
    });

    it("should allow unauthenticated users to visit login and register pages", () => {
        const publicRoutes = [getRouteLogin(), getRouteRegister()];

        publicRoutes.forEach((path) => {
            cy.visit(path);
            cy.url().should("include", path);
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
        cy.url().should("include", "/invalid-route");
    });
});

import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "https://packing-supply-management-app-iskanderovulans-projects.vercel.app/",
        supportFile: "cypress/support/e2e.ts",
        specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    },
});

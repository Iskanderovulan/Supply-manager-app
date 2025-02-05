import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: process.env.CI ? "http://localhost:4173/" : "http://localhost:5173/",
        supportFile: "cypress/support/e2e.ts",
        specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    },
});

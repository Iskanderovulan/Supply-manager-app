import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            app: path.resolve(__dirname, "./src/app"),
            pages: path.resolve(__dirname, "./src/pages"),
            widgets: path.resolve(__dirname, "./src/widgets"),
            shared: path.resolve(__dirname, "./src/shared"),
        },
    },
});

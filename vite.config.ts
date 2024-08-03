import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            react(),
            tsconfigPaths(),
            svgr({
                svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
                include: "**/*.svg",
            }),
        ],
        resolve: {
            alias: {
                app: path.resolve(__dirname, "./src/app"),
                pages: path.resolve(__dirname, "./src/pages"),
                widgets: path.resolve(__dirname, "./src/widgets"),
                shared: path.resolve(__dirname, "./src/shared"),
            },
        },
        define: {
            __IS_DEV__: mode === "development",
        },
    };
});

import { defineConfig } from "vite";

export default {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/react-vite",
    viteFinal: async (config) => {
        return defineConfig({
            ...config,
            resolve: {
                alias: {
                    "@": "/src",
                },
            },
        });
    },
};

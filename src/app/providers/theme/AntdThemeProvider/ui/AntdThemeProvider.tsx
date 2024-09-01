// AntdThemeProvider.tsx
import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { defaultTheme } from "../lib/antdTheme";

interface AntdThemeProviderProps {
    children: ReactNode;
}

const AntdThemeProvider: React.FC<AntdThemeProviderProps> = ({ children }) => {
    return <ConfigProvider theme={defaultTheme}>{children}</ConfigProvider>;
};

export default AntdThemeProvider;

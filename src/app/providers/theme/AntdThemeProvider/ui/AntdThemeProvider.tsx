// AntdThemeProvider.tsx
import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { lightTheme, darkTheme } from "../lib/antdTheme";
import { useTheme, Theme } from "app/providers/theme/ThemeProvider";

interface AntdThemeProviderProps {
    children: ReactNode;
}

const AntdThemeProvider: React.FC<AntdThemeProviderProps> = ({ children }) => {
    const { theme } = useTheme();

    const antdTheme = theme === Theme.DARK ? darkTheme : lightTheme;
    return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};

export default AntdThemeProvider;

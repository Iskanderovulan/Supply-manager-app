import { ReactNode, FC } from "react";
import { ConfigProvider } from "antd";
import { defaultTheme } from "../lib/antdTheme";

interface AntdThemeProviderProps {
    children: ReactNode;
}

const AntdThemeProvider: FC<AntdThemeProviderProps> = ({ children }) => {
    return <ConfigProvider theme={defaultTheme}>{children}</ConfigProvider>;
};

export default AntdThemeProvider;

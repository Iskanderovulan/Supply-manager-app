import { I18nextProvider } from "react-i18next";
import i18n from "@shared/config/i18n/i18n";
import { App as AntApp } from "antd";
import { Theme } from "@shared/types/theme";
import { ThemeProvider } from "@app/providers/theme/ThemeProvider";
import { AntdThemeProvider } from "@app/providers/theme/AntdThemeProvider";

export const ThemeDecorator = (theme: Theme) => {
    const WithThemeDecorator = (Story: () => JSX.Element) => (
        <ThemeProvider initialTheme={theme}>
            <AntdThemeProvider>
                <AntApp>
                    <I18nextProvider i18n={i18n}>
                        <Story />
                    </I18nextProvider>
                </AntApp>
            </AntdThemeProvider>
        </ThemeProvider>
    );

    return WithThemeDecorator;
};

import { FC, useMemo, useState, useEffect, ReactNode } from "react";
import { ThemeContext } from "../lib/ThemeContext";
import { Theme } from "@shared/types/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@shared/const/localstorage";

const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || savedTheme || Theme.DARK);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    const applyTheme = (newTheme: Theme) => {
        document.body.classList.add("disable-transitions");
        document.body.setAttribute("data-theme", newTheme);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.remove("disable-transitions");
            });
        });
    };

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

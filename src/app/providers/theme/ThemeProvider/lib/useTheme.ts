import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Theme } from "@shared/types/theme";
import { LOCAL_STORAGE_THEME_KEY } from "@shared/const/localstorage";

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (setTheme) {
            const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
            setTheme(newTheme);
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        }
    };

    return {
        theme: theme || Theme.DARK,
        toggleTheme,
    };
}

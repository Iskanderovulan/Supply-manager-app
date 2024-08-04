import { classNames } from "shared/lib/classNames/classNames";
import { FC } from "react";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { ReactComponent as LightIcon } from "shared/assets/icons/theme-light.svg";
import { ReactComponent as DarkIcon } from "shared/assets/icons/theme-dark.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames("", {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? (
                <DarkIcon className={cls.dark} />
            ) : (
                <LightIcon className={cls.light} />
            )}
        </Button>
    );
};

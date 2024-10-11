import { FC } from "react";
import { Theme, useTheme } from "@app/providers/theme/ThemeProvider";
import { Switch } from "antd";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={cls.themeSwitcher}>
            <Switch
                checked={theme === Theme.DARK}
                onChange={toggleTheme}
                className={className}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<BulbOutlined />}
            />
        </div>
    );
};

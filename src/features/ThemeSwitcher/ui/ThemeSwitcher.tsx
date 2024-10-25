import { Theme, useTheme } from "@app/providers/theme/ThemeProvider";
import { Switch } from "antd";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Switch
            checked={theme === Theme.DARK}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<BulbOutlined />}
        />
    );
};

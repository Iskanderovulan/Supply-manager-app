import { Switch } from "antd";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import { Theme } from "@shared/types/theme";
import { useTheme } from "@app/providers/theme/ThemeProvider";

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

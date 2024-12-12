import { Button, Layout } from "antd";
import { LangSwitcher } from "@features/LangSwitcher";
import { ThemeSwitcher } from "@features/ThemeSwitcher";
import { useCollapsed } from "@app/providers/CollapseProvider";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Logout } from "@features/Logout";
import { selectIsAuthenticated } from "@entities/Auth";
import cls from "./Navbar.module.scss";

const { Header } = Layout;

export const Navbar = () => {
    const { collapsed, toggleCollapse } = useCollapsed();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return (
        <Header className={cls.header}>
            <nav className={cls.nav}>
                <Button type="dashed" onClick={toggleCollapse}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <div className={cls.switchers}>
                    <LangSwitcher />
                    <ThemeSwitcher />
                    {isAuthenticated && <Logout />}
                </div>
            </nav>
        </Header>
    );
};

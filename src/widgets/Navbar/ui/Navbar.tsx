import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { selectIsAuthenticated } from "@entities/auth";
import { LangSwitcher } from "@features/langSwitcher";
import { ThemeSwitcher } from "@features/themeSwitcher";
import { Logout } from "@features/logout";
import { useCollapsed } from "@app/providers/CollapseProvider";
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

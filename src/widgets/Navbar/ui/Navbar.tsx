import { classNames } from "shared/lib/classNames/classNames";
import { Button, Layout } from "antd";
import cls from "./Navbar.module.scss";
import { LangSwitcher } from "features/LangSwitcher";
import { ThemeSwitcher } from "features/ThemeSwitcher";
import { useCollapsed } from "app/providers/layout/CollapseProvider";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Logout } from "features/Logout/ui/Logout";
import { selectIsAuthenticated } from "entities/Auth";

const { Header } = Layout;

export const Navbar = () => {
    const { collapsed, toggleCollapse } = useCollapsed();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    return (
        <Header className={classNames(cls.Header, {}, [])}>
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

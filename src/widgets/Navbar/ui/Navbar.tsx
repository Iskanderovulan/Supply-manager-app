import { classNames } from "shared/lib/classNames/classNames";
import { Button, Layout } from "antd";
import cls from "./Navbar.module.scss";
import { LangSwitcher } from "widgets/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { useCollapsed } from "app/providers/layout/CollapseProvider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

export const Navbar = () => {
    const { collapsed, toggleCollapse } = useCollapsed();

    return (
        <Header className={classNames(cls.Header, {}, [])}>
            <nav className={cls.nav}>
                <Button type="dashed" onClick={toggleCollapse}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <div className={cls.switchers}>
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div>
            </nav>
        </Header>
    );
};

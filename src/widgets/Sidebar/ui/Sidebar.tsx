import { Layout, Menu } from "antd";
import { useCollapsed } from "@app/providers/layout/CollapseProvider";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { selectIsAuthenticated } from "@features/Auth";
import { getMenuItems } from "../config/menuItems";
import { useTranslation } from "react-i18next";
import cls from "./Sidebar.module.scss";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;

export const Sidebar = () => {
    const { t } = useTranslation();
    const { collapsed } = useCollapsed();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();

    const { authItems, guestItems } = getMenuItems({ t });

    const items = isAuthenticated ? authItems : guestItems;
    return (
        <Sider
            width={250}
            theme="light"
            collapsible
            collapsed={collapsed}
            className={cls.Sidebar}
            trigger={null}
        >
            <Menu
                defaultSelectedKeys={["1"]}
                selectedKeys={[location.pathname]}
                mode="inline"
                className={cls["custom-menu"]}
                items={items}
            />
        </Sider>
    );
};

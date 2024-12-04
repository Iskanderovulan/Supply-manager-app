import { Layout, Menu, Typography } from "antd";
import { useCollapsed } from "@app/providers/layout/CollapseProvider";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { selectIsAuthenticated } from "@features/Auth";
import { getMenuItems } from "../model/menuItems";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import cls from "./Sidebar.module.scss";
import { useRef } from "react";
import { useAdjustHeight } from "../lib/useAdjustHeight";
import { useActiveMenuItem } from "../lib/useActiveMenuItem";

const { Sider } = Layout;
const { Title } = Typography;

export const Sidebar = () => {
    const { t: global } = useTranslation();
    const { collapsed } = useCollapsed();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const { authItems, guestItems } = getMenuItems({ global });
    const items = isAuthenticated ? authItems : guestItems;

    const { pathname } = useActiveMenuItem();
    useAdjustHeight(sidebarRef);

    return (
        <Sider
            ref={sidebarRef}
            width={250}
            theme="light"
            collapsible
            collapsed={collapsed}
            className={cls.Sidebar}
            trigger={null}
        >
            <Title className={classNames(cls.title)} level={collapsed ? 3 : 2}>
                CRM
            </Title>
            <Menu
                defaultSelectedKeys={["1"]}
                selectedKeys={[pathname]}
                mode="inline"
                className={cls["custom-menu"]}
                items={items}
            />
        </Sider>
    );
};

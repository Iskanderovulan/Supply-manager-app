import { useRef } from "react";
import { Layout, Menu, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { selectIsAuthenticated } from "@entities/Auth";
import { useCollapsed } from "@app/providers/CollapseProvider";
import { getMenuItems } from "../model/menuItems";
import { useAdjustHeight } from "../lib/useAdjustHeight";
import { useActiveMenuItem } from "../lib/useActiveMenuItem";
import cls from "./Sidebar.module.scss";

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
            className={cls.sidebar}
            trigger={null}
        >
            <Title className={cls.title} level={collapsed ? 3 : 2}>
                PSM
            </Title>
            <Menu
                selectedKeys={[pathname]}
                mode="inline"
                className={cls.customMenu}
                items={items}
            />
        </Sider>
    );
};

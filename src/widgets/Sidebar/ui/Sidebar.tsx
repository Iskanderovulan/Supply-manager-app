import { Layout, Menu } from "antd";
import { useCollapsed } from "app/providers/layout/CollapseProvider";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { authActions, selectIsAuthenticated } from "src/entities/Auth";
import { getMenuItems } from "../config/menuItems";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import cls from "./Sidebar.module.scss";

const { Sider } = Layout;

export const Sidebar = () => {
    const { t } = useTranslation();
    const { collapsed } = useCollapsed();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch()

    const logout = () =>{
        dispatch(authActions.clearToken())
    }

    const { authItems, guestItems } = getMenuItems({t,logout});

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
                mode="inline"
                className={cls["custom-menu"]}
                items={items}
            />
        </Sider>
    );
};

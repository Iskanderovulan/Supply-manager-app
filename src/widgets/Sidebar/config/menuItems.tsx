import {
    RadarChartOutlined,
    ApartmentOutlined,
    PieChartOutlined,
    LoginOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { getRouteMain, getRouteLogin } from "shared/const/router";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";

interface MenuItemsArgs {
    t: TFunction;
    logout: () => void;
}

export const getMenuItems = (menuItemsArgs: MenuItemsArgs) => {
    const { t, logout } = menuItemsArgs;
    const authItems = [
        {
            key: "1",
            icon: <PieChartOutlined />,
            label: <Link to={getRouteMain()}>{t("Products")}</Link>,
        },
        {
            key: "2",
            icon: <RadarChartOutlined />,
            label: <Link to="/charts">{t("Сhart")}</Link>,
        },
        {
            key: "sub1",
            icon: <ApartmentOutlined />,
            label: t("Classificators"),
            children: [
                { key: "3", label: <Link to="/material">{t("Material")}</Link> },
                { key: "4", label: <Link to="/color">{t("Color")}</Link> },
                { key: "5", label: <Link to="/pack-type">{t("Pack Type")}</Link> },
            ],
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <p onClick={logout}>{t("Logout")}</p>,
        },
    ];

    const guestItems = [
        {
            key: "login",
            icon: <LoginOutlined />,
            label: <Link to={getRouteLogin()}>{t("Login")}</Link>,
        },
    ];

    return { authItems, guestItems };
};

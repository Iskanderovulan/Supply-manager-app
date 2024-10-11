import {
    RadarChartOutlined,
    ApartmentOutlined,
    PieChartOutlined,
    LoginOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import {
    getRouteMain,
    getRouteLogin,
    getRouteRegister,
    getRouteMaterial,
} from "@shared/const/router";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";

interface MenuItemsArgs {
    t: TFunction;
}

export const getMenuItems = (menuItemsArgs: MenuItemsArgs) => {
    const { t } = menuItemsArgs;
    const authItems = [
        {
            key: getRouteMain(),
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
                { key: "3", label: <Link to={getRouteMaterial()}>{t("Material")}</Link> },
                { key: "4", label: <Link to="/color">{t("Color")}</Link> },
                { key: "5", label: <Link to="/pack-type">{t("Pack Type")}</Link> },
            ],
        },
    ];

    const guestItems = [
        {
            key: getRouteLogin(),
            icon: <LoginOutlined />,
            label: <Link to={getRouteLogin()}>{t("Login")}</Link>,
        },
        {
            key: getRouteRegister(),
            icon: <UserAddOutlined />,
            label: <Link to={getRouteRegister()}>{t("Register")}</Link>,
        },
    ];

    return { authItems, guestItems };
};

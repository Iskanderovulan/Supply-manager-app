import {
    getRouteMain,
    getRouteLogin,
    getRouteRegister,
    getRouteMaterial,
} from "@shared/const/router";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import {
    RadarChartOutlined,
    ApartmentOutlined,
    PieChartOutlined,
    LoginOutlined,
    UserAddOutlined,
    InboxOutlined,
    BgColorsOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";

interface MenuItemsArgs {
    t: TFunction;
}

export const getMenuItems = (menuItemsArgs: MenuItemsArgs) => {
    const { t } = menuItemsArgs;
    const authItems = [
        {
            key: getRouteMain(),
            icon: <PieChartOutlined />,
            label: <Link to={getRouteMain()}>{t("products")}</Link>,
        },
        {
            key: "2",
            icon: <RadarChartOutlined />,
            label: <Link to="/charts">{t("chart")}</Link>,
        },
        {
            key: "sub1",
            icon: <ApartmentOutlined />,
            label: t("classificators"),
            children: [
                {
                    key: "3",
                    icon: <InboxOutlined />,
                    label: <Link to={getRouteMaterial()}>{t("material")}</Link>,
                },
                {
                    key: "4",
                    icon: <BgColorsOutlined />,
                    label: <Link to="/color">{t("color")}</Link>,
                },
                {
                    key: "5",
                    icon: <AppstoreOutlined />,
                    label: <Link to="/pack-type">{t("packType")}</Link>,
                },
            ],
        },
    ];

    const guestItems = [
        {
            key: getRouteLogin(),
            icon: <LoginOutlined />,
            label: <Link to={getRouteLogin()}>{t("login")}</Link>,
        },
        {
            key: getRouteRegister(),
            icon: <UserAddOutlined />,
            label: <Link to={getRouteRegister()}>{t("register")}</Link>,
        },
    ];

    return { authItems, guestItems };
};

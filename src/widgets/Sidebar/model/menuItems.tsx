import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import {
    UserOutlined,
    RadarChartOutlined,
    ApartmentOutlined,
    PieChartOutlined,
    LoginOutlined,
    UserAddOutlined,
    InboxOutlined,
    BgColorsOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import {
    getRouteProduct,
    getRouteLogin,
    getRouteRegister,
    getRouteMaterial,
    getRouteColor,
    getRoutePack,
    getRouteProfile,
    getRouteChart,
} from "@shared/const/router";

interface MenuItemsArgs {
    global: TFunction;
}

export const getMenuItems = (menuItemsArgs: MenuItemsArgs) => {
    const { global } = menuItemsArgs;

    const authItems = [
        {
            key: getRouteProduct(),
            icon: <PieChartOutlined />,
            label: <Link to={getRouteProduct()}>{global("products")}</Link>,
        },
        {
            key: getRouteChart(),
            icon: <RadarChartOutlined />,
            label: <Link to={getRouteChart()}>{global("chart")}</Link>,
        },
        {
            key: "sub1",
            icon: <ApartmentOutlined />,
            label: global("classificators"),
            children: [
                {
                    key: getRouteMaterial(),
                    icon: <InboxOutlined />,
                    label: <Link to={getRouteMaterial()}>{global("material")}</Link>,
                },
                {
                    key: getRouteColor(),
                    icon: <BgColorsOutlined />,
                    label: <Link to={getRouteColor()}>{global("color")}</Link>,
                },
                {
                    key: getRoutePack(),
                    icon: <AppstoreOutlined />,
                    label: <Link to={getRoutePack()}>{global("pack")}</Link>,
                },
            ],
        },
        {
            key: getRouteProfile(),
            icon: <UserOutlined />,
            label: <Link to={getRouteProfile()}>{global("profile")}</Link>,
        },
    ];

    const guestItems = [
        {
            key: getRouteLogin(),
            icon: <LoginOutlined />,
            label: <Link to={getRouteLogin()}>{global("login")}</Link>,
        },
        {
            key: getRouteRegister(),
            icon: <UserAddOutlined />,
            label: <Link to={getRouteRegister()}>{global("register")}</Link>,
        },
    ];

    return { authItems, guestItems };
};

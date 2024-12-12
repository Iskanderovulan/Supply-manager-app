import {
    AppRoutes,
    getRouteProduct,
    getRouteLogin,
    getRouteRegister,
    getRouteMaterial,
    getRouteColor,
    getRoutePack,
    getRouteProfile,
    getRouteChart,
} from "@shared/const/router";
import { RouteProps } from "react-router-dom";
import { LoginPage } from "@pages/LoginPage";
import { RegisterPage } from "@pages/RegisterPage";
import { MaterialPage } from "@pages/MaterialPage";
import { PackPage } from "@pages/PackPage";
import { ColorPage } from "@pages/ColorPage";
import { ProductPage } from "@pages/ProductPage";
import { ProfilePage } from "@pages/ProfilePage";
import { ChartPage } from "@pages/ChartPage";

type CustomRouteProps = {
    isProtected?: boolean;
} & RouteProps;

export const routeConfig: Record<AppRoutes, CustomRouteProps> = {
    [AppRoutes.PRODUCT]: {
        path: getRouteProduct(),
        element: <ProductPage />,
        isProtected: true,
    },
    [AppRoutes.MATERIAL]: {
        path: getRouteMaterial(),
        element: <MaterialPage />,
        isProtected: true,
    },
    [AppRoutes.COLOR]: {
        path: getRouteColor(),
        element: <ColorPage />,
        isProtected: true,
    },
    [AppRoutes.PACK]: {
        path: getRoutePack(),
        element: <PackPage />,
        isProtected: true,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
        isProtected: false,
    },
    [AppRoutes.REGISTER]: {
        path: getRouteRegister(),
        element: <RegisterPage />,
        isProtected: false,
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfile(),
        element: <ProfilePage />,
        isProtected: true,
    },
    [AppRoutes.CHART]: {
        path: getRouteChart(),
        element: <ChartPage />,
        isProtected: true,
    },
};

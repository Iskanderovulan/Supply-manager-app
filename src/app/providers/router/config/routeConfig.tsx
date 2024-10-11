import {
    AppRoutes,
    getRouteMain,
    getRouteLogin,
    getRouteRegister,
    getRouteNotFound,
    getRouteMaterial,
} from "@shared/const/router";
import { RouteProps } from "react-router-dom";
import { MainPage } from "@pages/MainPage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { LoginPage } from "@pages/LoginPage";
import { RegisterPage } from "@pages/RegisterPage";
import { MaterialPage } from "@pages/MaterialPage";

type CustomRouteProps = {
    isProtected?: boolean;
} & RouteProps;

export const routeConfig: Record<AppRoutes, CustomRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
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
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
        isProtected: false,
    },
    [AppRoutes.MATERIAL]: {
        path: getRouteMaterial(),
        element: <MaterialPage />,
        isProtected: true,
    },
};

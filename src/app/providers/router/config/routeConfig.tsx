import { RouteProps } from "react-router-dom";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
// import ProtectedRoute from "shared/lib/ProtectedRoute/ProtectedRoute"; // Компонент защищенного маршрута

export enum AppRoutes {
    MAIN = "main",
    LOGIN = "login",
    REGISTER = "register",
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.LOGIN]: "/login",
    [AppRoutes.REGISTER]: "/register",
    [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};

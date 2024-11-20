export enum AppRoutes {
    LOGIN = "login",
    REGISTER = "register",
    MATERIAL = "material",
    COLOR = "color",
    PACK = "pack",
    PRODUCT = "product"
}

export const getRouteProduct = () => "/";
export const getRouteLogin = () => "/login";
export const getRouteRegister = () => "/register";
export const getRouteMaterial = () => "/material";
export const getRouteColor = () => "/color";
export const getRoutePack = () => "/pack";

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.PRODUCT]: getRouteProduct(),
    [AppRoutes.LOGIN]: getRouteLogin(),
    [AppRoutes.REGISTER]: getRouteRegister(),
    [AppRoutes.MATERIAL]: getRouteMaterial(),
    [AppRoutes.COLOR]: getRouteColor(),
    [AppRoutes.PACK]: getRoutePack(),
};

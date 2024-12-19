export enum AppRoutes {
    LOGIN = "login",
    REGISTER = "register",
    MATERIAL = "material",
    COLOR = "color",
    PACK = "pack",
    PRODUCT = "product",
    PROFILE = "profile",
    CHART = "chart",
    DETAILS = "details",
}

export const getRouteProduct = () => "/";
export const getRouteLogin = () => "/login";
export const getRouteRegister = () => "/register";
export const getRouteMaterial = () => "/material";
export const getRouteColor = () => "/color";
export const getRoutePack = () => "/pack";
export const getRouteProfile = () => "/profile";
export const getRouteChart = () => "/chart";
export const getRouteDetails = (id: string) => `/details/${id}`;

// Route-to-Enum mapping
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteLogin()]: AppRoutes.LOGIN,
    [getRouteRegister()]: AppRoutes.REGISTER,
    [getRouteMaterial()]: AppRoutes.MATERIAL,
    [getRouteColor()]: AppRoutes.COLOR,
    [getRoutePack()]: AppRoutes.PACK,
    [getRouteProduct()]: AppRoutes.PRODUCT,
    [getRouteProfile()]: AppRoutes.PROFILE,
    [getRouteChart()]: AppRoutes.CHART,
    [getRouteDetails(":id")]: AppRoutes.DETAILS,
};

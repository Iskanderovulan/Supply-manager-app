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

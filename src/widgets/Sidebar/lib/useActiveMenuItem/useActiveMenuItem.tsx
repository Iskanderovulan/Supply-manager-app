import { useLocation } from "react-router-dom";
import { getRouteDetails, getRouteProduct } from "@shared/const/router";

export const useActiveMenuItem = () => {
    const { pathname } = useLocation();

    if (pathname.startsWith(getRouteDetails(""))) {
        return { pathname: getRouteProduct() };
    }

    return { pathname };
};

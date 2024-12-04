import { useLocation } from "react-router-dom";

export const useActiveMenuItem = () => {
    const location = useLocation();
    const { pathname } = location;
    return { pathname };
};

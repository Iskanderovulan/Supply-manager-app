import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { selectIsAuthenticated } from "@entities/Auth";

interface ProtectedRouteProps {
    children: ReactNode;
    reverseRedirect?: boolean; // Optional prop for reversing the redirect logic
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const { children, reverseRedirect = false } = props;
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();

    // If reverseRedirect is true, this route is for unauthenticated pages like login/register
    if (reverseRedirect && isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // If reverseRedirect is false, this route is for authenticated pages
    if (!reverseRedirect && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If no redirects, render the children
    return children;
};

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "app/providers/router/config/routeConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import AppLayout from "../AppLayout/AppLayout";
import { ProtectedRoute } from "shared/ui/ProtectedRoute/ProtectedRoute";

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            {Object.values(routeConfig).map(({ element, path, isProtected }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <ProtectedRoute reverseRedirect={!isProtected}>
                            <Suspense fallback={<PageLoader />}>{element}</Suspense>
                        </ProtectedRoute>
                    }
                />
            ))}
        </Route>
    </Routes>
);

export default AppRouter;

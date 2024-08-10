import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "app/providers/router/config/routeConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import AppLayout from "../AppLayout/AppLayout";

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            {Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={<Suspense fallback={<PageLoader />}>{element}</Suspense>}
                />
            ))}
        </Route>
    </Routes>
);

export default AppRouter;

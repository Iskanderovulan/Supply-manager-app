import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "@app/providers/router/config/routeConfig";
import { Loader } from "@shared/ui/Loader";
import { ProtectedRoute } from "@shared/lib/routing";
import { NotFoundPage } from "@pages/NotFoundPage";
import AppLayout from "../AppLayout/AppLayout";

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            {Object.values(routeConfig).map(({ element, path, isProtected }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <ProtectedRoute reverseRedirect={!isProtected}>
                            <Suspense fallback={<Loader />}>{element}</Suspense>
                        </ProtectedRoute>
                    }
                />
            ))}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default AppRouter;

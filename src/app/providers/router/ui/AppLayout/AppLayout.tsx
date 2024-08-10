import Layout from "antd/es/layout/layout";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/theme/ThemeProvider";
import { Outlet } from "react-router-dom";
import { Sidebar } from "widgets/Sidebar";
import { Navbar } from "widgets/Navbar";
import { AppFooter } from "widgets/AppFooter";
import { Suspense } from "react";

import cls from "./AppLayout.module.scss";

const AppLayout = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames("app", {}, [theme])}>
            <Suspense fallback="">
                <Layout className={cls.layout}>
                    <Sidebar />
                    <Layout className={cls.siteLayout}>
                        <Navbar />
                        <div className={cls.content}>
                            <Outlet />
                        </div>
                        <AppFooter />
                    </Layout>
                </Layout>
            </Suspense>
        </div>
    );
};

export default AppLayout;

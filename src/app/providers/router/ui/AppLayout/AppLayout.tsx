import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@widgets/Sidebar";
import { Navbar } from "@widgets/Navbar";
import { Loader } from "@shared/ui/Loader";
import Layout from "antd/es/layout/layout";
import cls from "./AppLayout.module.scss";

const AppLayout = () => {
    return (
        <div className="app">
            <Suspense fallback={<Loader />}>
                <Layout className={cls.layout}>
                    <Sidebar />
                    <Layout className={cls.siteLayout}>
                        <Navbar />
                        <div className={cls.content}>
                            <Outlet />
                        </div>
                    </Layout>
                </Layout>
            </Suspense>
        </div>
    );
};

export default AppLayout;

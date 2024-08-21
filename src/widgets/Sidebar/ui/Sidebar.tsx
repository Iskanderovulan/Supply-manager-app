import { RadarChartOutlined, ApartmentOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useCollapsed } from "app/providers/layout/CollapseProvider";
import { useTranslation } from "react-i18next";
import cls from "./Sidebar.module.scss";

const { Sider } = Layout;

export const Sidebar = () => {
    const { collapsed } = useCollapsed();
    const { t } = useTranslation();

    return (
        <Sider
            width={250}
            theme="light"
            collapsible
            collapsed={collapsed}
            className={cls.Sidebar}
            trigger={null}
        >
            <Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                className={cls["custom-menu"]}
                items={[
                    {
                        key: "1",
                        icon: <PieChartOutlined />,
                        label: t("Products"),
                    },
                    {
                        key: "2",
                        icon: <RadarChartOutlined />,
                        label: t("Сhart"),
                    },
                    {
                        key: "sub1",
                        icon: <ApartmentOutlined />,
                        label: t("Classificators"),
                        children: [
                            { key: "3", label: t("Material") },
                            { key: "4", label: t("Color") },
                            { key: "5", label: t("Pack Type") },
                        ],
                    },
                ]}
            />
        </Sider>
    );
};

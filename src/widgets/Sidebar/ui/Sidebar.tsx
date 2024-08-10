import { RadarChartOutlined, ApartmentOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useCollapsed } from "app/providers/layout/CollapseProvider";
import cls from "./Sidebar.module.scss";

const { Sider } = Layout;

export const Sidebar = () => {
    const { collapsed } = useCollapsed();

    return (
        <Sider
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
                        label: "Tasks",
                    },
                    {
                        key: "2",
                        icon: <RadarChartOutlined />,
                        label: "Stats",
                    },
                    {
                        key: "sub1",
                        icon: <ApartmentOutlined />,
                        label: "Classificators",
                        children: [
                            { key: "3", label: "Categories" },
                            { key: "4", label: "Tags" },
                        ],
                    },
                ]}
            />
        </Sider>
    );
};

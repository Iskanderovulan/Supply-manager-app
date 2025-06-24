import { FC } from "react";
import { Breadcrumb, Flex } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";
import { TFunction } from "i18next";

interface ChartCrumbProps {
    t: TFunction;
}

export const ChartCrumb: FC<ChartCrumbProps> = ({ t }) => {
    return (
        <Flex justify="flex-end">
            <Breadcrumb
                items={[
                    {
                        title: <CrumbItem icon={<AppstoreOutlined />} text={t("chartPage")} />,
                    },
                ]}
            />
        </Flex>
    );
};

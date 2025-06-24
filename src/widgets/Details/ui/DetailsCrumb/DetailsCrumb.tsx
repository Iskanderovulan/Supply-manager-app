import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Flex, Typography } from "antd";
import { PieChartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { CrumbItem } from "@shared/ui/CrumbItem/CrumbItem";
import { getRouteProduct } from "@shared/const/router";
import cls from "./DetailsCrumb.module.scss";

const { Text } = Typography;

export const DetailsCrumb: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PRODUCT);
    const navigate = useNavigate();

    return (
        <Flex vertical align="flex-end">
            <Breadcrumb
                items={[
                    {
                        title: (
                            <Text
                                className={cls.clickable}
                                onClick={() => navigate(getRouteProduct())}
                            >
                                <CrumbItem icon={<PieChartOutlined />} text={t("productPage")} />
                            </Text>
                        ),
                    },
                    {
                        title: <CrumbItem icon={<InfoCircleOutlined />} text={t("detailsPage")} />,
                    },
                ]}
            />
        </Flex>
    );
});

DetailsCrumb.displayName = "DetailsCrumb";

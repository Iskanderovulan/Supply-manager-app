import { FC } from "react";
import { Card, Typography, Flex, Descriptions } from "antd";
import { useTranslation } from "react-i18next";
import { DetailsNavigate } from "../DetailsNavigate/DetailsNavigate";
import { DetailsCopy } from "../DetailsCopy/DetailsCopy";
import { TranslationId } from "@shared/const/translation";
import { ProductSchema } from "@entities/product";
import { detailsConfig } from "@widgets/Details/config/detailsConfig";
import cls from "./DetailsInfo.module.scss";

const { Title } = Typography;

interface DetailsInfoProps {
    product: ProductSchema;
}

export const DetailsInfo: FC<DetailsInfoProps> = ({ product }) => {
    const config = detailsConfig(product);
    const { t } = useTranslation(TranslationId.PRODUCT);

    return (
        <>
            <DetailsNavigate />
            <Flex vertical gap="middle" className={cls.detailsInfo}>
                <Card bordered={false} className={cls.detailsCard}>
                    <Flex vertical gap="small">
                        <Flex justify="flex-end">
                            <DetailsCopy product={product} />
                        </Flex>
                        <Title level={2}>{product.name}</Title>
                        <Descriptions column={1} bordered>
                            {config.map((detail, index) => (
                                <Descriptions.Item key={index} label={t(detail.labelKey)}>
                                    {detail.value}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Flex>
                </Card>
            </Flex>
        </>
    );
};

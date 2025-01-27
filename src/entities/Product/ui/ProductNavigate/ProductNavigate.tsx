import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { getRouteDetails } from "@shared/const/router";

interface ProductNavigateProps {
    productId: string;
}

export const ProductNavigate: FC<ProductNavigateProps> = ({ productId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation(TranslationId.PRODUCT);

    const handleViewDetails = () => {
        navigate(getRouteDetails(productId));
    };

    return (
        <Button type="link" onClick={handleViewDetails} icon={<InfoCircleOutlined />}>
            {t("viewDetails")}
        </Button>
    );
};

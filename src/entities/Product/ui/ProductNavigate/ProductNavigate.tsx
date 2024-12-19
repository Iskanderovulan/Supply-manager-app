import { FC } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getRouteDetails } from "@shared/const/router";
import { InfoCircleOutlined } from "@ant-design/icons";

interface ProductNavigateProps {
    productId: string;
}

export const ProductNavigate: FC<ProductNavigateProps> = ({ productId }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(getRouteDetails(productId));
    };

    return (
        <Button type="link" onClick={handleViewDetails} icon={<InfoCircleOutlined />}>
            View Details
        </Button>
    );
};

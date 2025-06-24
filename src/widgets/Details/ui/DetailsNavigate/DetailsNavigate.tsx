import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const DetailsNavigate: FC = () => {
    const navigate = useNavigate();
    const { t: global } = useTranslation();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Button type="default" onClick={handleGoBack} icon={<ArrowLeftOutlined />}>
            {global("goBack")}
        </Button>
    );
};

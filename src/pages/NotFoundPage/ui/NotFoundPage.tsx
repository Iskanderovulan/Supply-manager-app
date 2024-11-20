import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Space } from "antd";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import cls from "./NotFoundPage.module.scss";

const { Title, Text } = Typography;

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className = "" }) => {
    const { t: global } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={classNames(cls.NotFoundPage, className)}>
            <Space direction="vertical" align="center" className={cls.content} size="large">
                <Title level={1} className={cls.errorCode}>
                    {global("errorCode")}
                </Title>
                <Text className={cls.errorMessage}>{global("message")}</Text>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => navigate("/")}
                    className={cls.returnButton}
                >
                    {global("returnButton")}
                </Button>
            </Space>
        </div>
    );
};

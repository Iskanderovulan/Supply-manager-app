import { FC } from "react";
import { Card, Space, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { ProfileDelete } from "../ProfileDelete/ProfileDelete";
import cls from "./ProfileInfo.module.scss";

const { Text, Title } = Typography;

interface ProfileInfoProps {
    name: string;
    email: string;
    onEdit: () => void;
    userId: string;
}

export const ProfileInfo: FC<ProfileInfoProps> = (props) => {
    const { name, email, onEdit, userId } = props;
    const { t } = useTranslation(TranslationId.PROFILE);

    return (
        <Card bordered={false}>
            <Space direction="vertical" size="middle" className={cls.profileInfo}>
                <Title level={3}>{t("profileInfo")}</Title>
                <Text>
                    <strong>{t("nameLabel")}:</strong> {name}
                </Text>
                <Text>
                    <strong>{t("emailLabel")}:</strong> {email}
                </Text>
                <Space className={cls.buttonGroup}>
                    <Button type="primary" onClick={onEdit}>
                        {t("editProfile")}
                    </Button>
                    <ProfileDelete userId={userId} />
                </Space>
            </Space>
        </Card>
    );
};

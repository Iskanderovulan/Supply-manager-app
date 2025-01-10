import { FC, useEffect } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useUpdateUserMutation } from "@entities/Profile/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { emailPattern, namePattern } from "@shared/lib/validators/authValidators";
import { useForceTranslate } from "@shared/lib/hooks/useForceTranslate";

const { Title } = Typography;

interface ProfileFormProps {
    initialValues: { name: string; email: string };
    onClose: () => void;
    userId: string;
}

export const ProfileForm: FC<ProfileFormProps> = (props) => {
    const { initialValues, onClose, userId } = props;
    const [form] = Form.useForm();
    const [updateUser, { isLoading: isUpdating, isError, isSuccess, error, reset }] =
        useUpdateUserMutation();

    const { t } = useTranslation(TranslationId.PROFILE);
    const { t: auth } = useTranslation(TranslationId.AUTH);
    const { t: global } = useTranslation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.updateSuccess,
    });
    console.log(10);
    const handleSubmit = async (values: { name: string; email: string }) => {
        await updateUser({ userId: userId, ...values });
    };

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess, onClose]);

    useForceTranslate({ form });

    return (
        <Card bordered={false}>
            <Title level={2}>{t("profileInfo")}</Title>
            <Form
                form={form}
                initialValues={initialValues}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label={auth("nameLabel")}
                    name="name"
                    rules={[
                        { required: true, message: auth("nameRequired") },
                        { pattern: namePattern, message: auth("nameInvalid") },
                    ]}
                >
                    <Input placeholder={auth("namePlaceholder")} />
                </Form.Item>
                <Form.Item
                    label={auth("emailLabel")}
                    name="email"
                    rules={[
                        { required: true, message: auth("emailRequired") },
                        { pattern: emailPattern, message: auth("emailInvalid") },
                    ]}
                >
                    <Input placeholder={auth("emailPlaceholder")} />
                </Form.Item>
                <Form.Item>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <Button type="primary" htmlType="submit" loading={isUpdating}>
                            {t("saveChanges")}
                        </Button>
                        <Button type="default" onClick={onClose}>
                            {global("cancel")}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Card>
    );
};

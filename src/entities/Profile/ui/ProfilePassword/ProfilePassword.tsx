import { FC, memo } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useChangePasswordMutation } from "@entities/Profile/api";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { passwordPattern } from "@shared/lib/validators/authValidators";
import { useForceTranslate } from "@shared/lib/hooks/useForceTranslate";

const { Title } = Typography;

export const ProfilePassword: FC = memo(() => {
    const { t } = useTranslation(TranslationId.PROFILE);
    const { t: auth } = useTranslation(TranslationId.AUTH);

    const [changePassword, { isLoading, isError, isSuccess, error, reset }] =
        useChangePasswordMutation();
    const [form] = Form.useForm();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.passwordChangeSuccess,
    });

    const handleFinish = async (values: { oldPassword: string; newPassword: string }) => {
        await changePassword(values);
        form.resetFields();
    };

    useForceTranslate({ form });

    return (
        <Card bordered={false}>
            <Title level={3}>{t("changePasswordTitle")}</Title>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    label={t("oldPasswordLabel")}
                    name="oldPassword"
                    rules={[
                        { required: true, message: auth("passwordRequired") },
                        { pattern: passwordPattern, message: auth("passwordInvalid") },
                    ]}
                >
                    <Input.Password placeholder={t("oldPasswordPlaceholder")} />
                </Form.Item>
                <Form.Item
                    label={t("newPasswordLabel")}
                    name="newPassword"
                    rules={[
                        { required: true, message: auth("passwordRequired") },
                        { pattern: passwordPattern, message: auth("passwordInvalid") },
                    ]}
                >
                    <Input.Password placeholder={t("newPasswordPlaceholder")} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        {t("changePasswordButton")}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
});

ProfilePassword.displayName = "ProfilePassword";

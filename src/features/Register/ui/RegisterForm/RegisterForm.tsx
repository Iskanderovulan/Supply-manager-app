import { FC } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import { emailPattern, passwordPattern, namePattern } from "@shared/lib/validators/authValidators";
import { useForceTranslate } from "@shared/lib/hooks/useForceTranslate";
import { RememberMeSchema } from "@entities/Auth";
import { RegisterSchema } from "@features/Register/model/registerSchema";
import cls from "./RegisterForm.module.scss";

const { Title } = Typography;

interface RegisterFormProps {
    onFinish: (values: RegisterSchema & RememberMeSchema) => void;
    isLoading: boolean;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onFinish, isLoading }) => {
    const { t } = useTranslation(TranslationId.AUTH);
    const [form] = Form.useForm<RegisterSchema & RememberMeSchema>();

    useForceTranslate({ form });

    return (
        <div className={cls.wrap}>
            <Form layout="vertical" form={form} onFinish={onFinish} className={cls.content}>
                <Title className={cls.title} level={3}>
                    {t("registerNewAccount")}
                </Title>
                <Form.Item
                    label={t("nameLabel")}
                    name="name"
                    rules={[
                        { required: true, message: t("nameRequired") },
                        { pattern: namePattern, message: t("nameInvalid") },
                    ]}
                >
                    <Input placeholder={t("namePlaceholder")} className={cls.inputField} />
                </Form.Item>

                <Form.Item
                    label={t("emailLabel")}
                    name="email"
                    rules={[
                        { required: true, message: t("emailRequired") },
                        { pattern: emailPattern, message: t("emailInvalid") },
                    ]}
                >
                    <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        className={cls.inputField}
                    />
                </Form.Item>

                <Form.Item
                    label={t("passwordLabel")}
                    name="password"
                    rules={[
                        { required: true, message: t("passwordRequired") },
                        { pattern: passwordPattern, message: t("passwordInvalid") },
                    ]}
                >
                    <Input.Password
                        placeholder={t("passwordPlaceholder")}
                        className={cls.inputField}
                    />
                </Form.Item>

                <Form.Item
                    label={t("confirmPasswordLabel")}
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: t("confirmPasswordRequired") },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t("passwordMismatch")));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder={t("confirmPasswordPlaceholder")}
                        className={cls.inputField}
                    />
                </Form.Item>

                <Form.Item name="rememberMe" valuePropName="checked">
                    <Checkbox>{t("rememberMe")}</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        className={cls.button}
                    >
                        {t("registerButton")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

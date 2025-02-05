import { FC } from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { emailPattern, passwordPattern } from "@shared/lib/validators/authValidators";
import { TranslationId } from "@shared/const/translation";
import { useForceTranslate } from "@shared/lib/hooks/useForceTranslate";
import { RememberMeSchema } from "@entities/Auth";
import { LoginSchema } from "@features/Login/model/loginSchema";
import cls from "./LoginForm.module.scss";

const { Title } = Typography;

export interface LoginFormProps {
    onFinish: (values: LoginSchema & RememberMeSchema) => void;
    isLoading: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish, isLoading }) => {
    const { t } = useTranslation(TranslationId.AUTH);
    const [form] = Form.useForm<LoginSchema & RememberMeSchema>();

    useForceTranslate({ form });

    return (
        <div className={cls.wrap} data-testid="LoginForm">
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                className={cls.content}
                initialValues={{ rememberMe: true }}
            >
                <Title className={cls.title} level={3}>
                    {t("loginToYourAccount")}
                </Title>

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
                        {t("loginButton")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

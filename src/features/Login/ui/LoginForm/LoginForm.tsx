import { FC, useEffect } from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { LoginSchema } from "@features/Login/model/types/loginSchema";
import { emailPattern, passwordPattern } from "@shared/lib/validators/authValidators";
import { TranslationId } from "@shared/const/translation";
import { RememberMeSchema } from "@features/Auth";
import cls from "./LoginForm.module.scss";

const { Title } = Typography;

interface LoginFormProps {
    onFinish: (values: LoginSchema & RememberMeSchema) => void;
    isLoading: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish, isLoading }) => {
    const { t, i18n } = useTranslation(TranslationId.AUTH);
    const [form] = Form.useForm<LoginSchema & RememberMeSchema>();

    useEffect(() => {
        form.getFieldsError().forEach(({ name, errors }) => {
            if (errors.length > 0) {
                form.validateFields([name]);
            }
        });
    }, [i18n.language, form]);

    return (
        <div className={cls.wrap}>
            <Form layout="vertical" form={form} onFinish={onFinish} className={cls.content}>
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

import { useEffect } from "react";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "@features/Auth";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { loginFormConfig } from "@features/Auth/model/config/loginFormConfig";
import { LoginSchema } from "@features/Auth/model/types/loginSchema";
import { useLoginMutation } from "@features/Auth/model/api/loginApi";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { Title } from "@shared/ui/Title";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";
import cls from "./Login.module.scss";

export const Login = () => {
    const { t } = useTranslation(TranslationId.AUTH);
    const dispatch = useAppDispatch();

    const [login, { isLoading, isError, error, isSuccess, data, reset }] = useLoginMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.loginSuccess.message,
    });

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(authActions.setCredentials({ tokens: data.tokens }));
        }
    }, [isSuccess, data, dispatch]);

    const handleLogin = (values: LoginSchema) => {
        login(values);
    };
    return (
        <>
            <DynamicForm<LoginSchema>
                className={cls.login}
                config={loginFormConfig(t)}
                onFinish={handleLogin}
                loading={isLoading}
                header={<Title text={t("loginToYourAccount")} align="center" />}
            />
        </>
    );
};

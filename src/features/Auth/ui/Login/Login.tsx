import { useEffect } from "react";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "@features/Auth";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { loginFormConfig } from "@features/Auth/model/config/loginFormConfig";
import { TranslationId } from "@shared/const/translation";
import { LoginSchema } from "@features/Auth/model/types/loginSchema";
import { useLoginMutation } from "@features/Auth/model/api/loginApi";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "@shared/const/notifications";
import cls from "./Login.module.scss";
import { Title } from "@shared/ui/Title";

export const Login = () => {
    const dispatch = useAppDispatch();

    const [login, { isLoading, isError, error, isSuccess, data, reset }] = useLoginMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.loginSuccess.message,
    });
    console.log(data);

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
                config={loginFormConfig}
                onFinish={handleLogin}
                translation={TranslationId.AUTH}
                loading={isLoading}
                header={<Title text="Login to your account" align="center" />}
            />
        </>
    );
};

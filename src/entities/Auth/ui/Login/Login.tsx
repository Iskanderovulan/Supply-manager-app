import { useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "entities/Auth";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { loginFormConfig } from "entities/Auth/model/config/loginFormConfig";
import { TranslationId } from "shared/const/translation";
import { LoginSchema } from "entities/Auth/model/types/loginSchema";
import { useLoginMutation } from "entities/Auth/model/api/loginApi";
import { useNotification } from "shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "shared/const/notifications";
import cls from "./Login.module.scss";

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

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(authActions.setCredentials({ tokens: data.tokens, user: data.user }));
        }
    }, [isSuccess, data, dispatch]);

    const handleLogin = (values: LoginSchema) => {
        login(values);
    };
    return (
        <DynamicForm<LoginSchema>
            className={cls.login}
            config={loginFormConfig}
            onFinish={handleLogin}
            translation={TranslationId.AUTH}
            loading={isLoading}
        />
    );
};

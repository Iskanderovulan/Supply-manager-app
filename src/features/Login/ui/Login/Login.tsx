import { FC, useEffect } from "react";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { authActions } from "@entities/Auth";
import { LoginSchema } from "@features/Login/model/loginSchema";
import { useLoginMutation } from "@features/Login/api";
import { LoginForm } from "../LoginForm/LoginForm";

export const Login: FC = () => {
    const dispatch = useAppDispatch();
    const [login, { isLoading, isError, error, isSuccess, data, reset }] = useLoginMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.loginSuccess,
    });

    useEffect(() => {
        if (isSuccess && data) {
            const { tokens } = data;
            dispatch(authActions.setCredentials({ tokens }));
        }
    }, [isSuccess, data, dispatch]);

    const handleLogin = (values: LoginSchema & { rememberMe: boolean }) => {
        const { rememberMe, ...loginData } = values;
        dispatch(authActions.setRememberMe(rememberMe));
        login(loginData);
    };

    return <LoginForm onFinish={handleLogin} isLoading={isLoading} />;
};

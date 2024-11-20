import { FC, useEffect } from "react";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { authActions } from "@features/Auth";
import { useRegisterMutation } from "@features/Register/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { RegisterSchema } from "@features/Register/model/types/registerSchema";

export const Register: FC = () => {
    const dispatch = useAppDispatch();
    const [register, { isLoading, isError, error, isSuccess, data, reset }] = useRegisterMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.registrationSuccess,
    });

    useEffect(() => {
        if (isSuccess && data) {
            const { tokens } = data;
            dispatch(authActions.setCredentials({ tokens })); // `rememberMe` флаг можно задать в отдельной обработке
        }
    }, [isSuccess, data, dispatch]);

    const handleRegister = (values: RegisterSchema & { rememberMe: boolean }) => {
        const { rememberMe, ...registerData } = values;
        dispatch(authActions.setRememberMe(rememberMe)); // Установка флага `rememberMe` перед регистрацией
        register(registerData); // Отправляем данные регистрации без `rememberMe`
    };

    return <RegisterForm onFinish={handleRegister} isLoading={isLoading} />;
};

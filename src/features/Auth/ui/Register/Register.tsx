import { useEffect } from "react";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "@features/Auth";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { registerFormConfig } from "@features/Auth/model/config/registerFormConfig";
import { TranslationId } from "@shared/const/translation";
import { useRegisterMutation } from "@features/Auth/model/api/registerApi";
import { RegisterSchema } from "@features/Auth/model/types/registerSchema";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "@shared/const/notifications";
import cls from "./Register.module.scss";
import { Title } from "@shared/ui/Title";

export const Register = () => {
    const dispatch = useAppDispatch();

    const [register, { isLoading, isError, error, isSuccess, data, reset }] = useRegisterMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.registrationSuccess.message,
    });

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(authActions.setCredentials({ tokens: data.tokens }));
        }
    }, [isSuccess, data, dispatch]);

    const handleRegister = (values: RegisterSchema) => {
        register(values);
    };

    return (
        <>
            <DynamicForm<RegisterSchema>
                className={cls.register}
                config={registerFormConfig}
                onFinish={handleRegister}
                translation={TranslationId.AUTH}
                loading={isLoading}
                header={<Title text="Register new account" align="center" />}
            />
        </>
    );
};

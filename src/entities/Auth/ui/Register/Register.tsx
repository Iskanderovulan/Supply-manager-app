import { useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "entities/Auth";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { registerFormConfig } from "entities/Auth/model/config/registerFormConfig";
import { TranslationId } from "shared/const/translation";
import { useRegisterMutation } from "entities/Auth/model/api/registerApi";
import { RegisterSchema } from "entities/Auth/model/types/registerSchema";
import { useNotification } from "shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "shared/const/notifications";
import cls from "./Register.module.scss";

export const Register = () => {
    const dispatch = useAppDispatch();

    const [register, { isLoading, error, isSuccess, data, reset }] = useRegisterMutation();

    useNotification(error, isSuccess, NotificationData.registrationSuccess.key, reset);

    useEffect(() => {
        if (isSuccess && data) {
            dispatch(authActions.setCredentials({ tokens: data.tokens, user: data.user }));
        }
    }, [isSuccess, data, dispatch]);

    const handleRegister = async (values: RegisterSchema) => {
        await register(values).unwrap();
    };

    return (
        <DynamicForm<RegisterSchema>
            className={cls.register}
            config={registerFormConfig}
            onFinish={handleRegister}
            translation={TranslationId.AUTH}
            loading={isLoading}
        />
    );
};

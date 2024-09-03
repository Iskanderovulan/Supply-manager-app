import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "entities/Auth";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { registerFormConfig } from "entities/Auth/model/config/registerFormConfig";
import { TranslationId } from "shared/const/translation";
import { useRegisterMutation } from "entities/Auth/model/api/registerApi";
import { RegisterSchema } from "entities/Auth/model/types/registerSchema";
import { App as AntApp } from "antd";
import { authError } from "shared/types/auth";
import cls from "./Register.module.scss";

export const Register = () => {
    const dispatch = useAppDispatch();
    const { notification } = AntApp.useApp();

    const [register, { isLoading }] = useRegisterMutation();

    const handleRegister = async (values: RegisterSchema) => {
        try {
            const data = await register(values).unwrap();
            dispatch(authActions.setCredentials({ tokens: data.tokens, user: data.user }));
        } catch (error) {
            const customError = error as authError;
            notification.error({
                message: "Ошибка при входе",
                description: customError.data?.message || "Произошла неожиданная ошибка",
            });
        }
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

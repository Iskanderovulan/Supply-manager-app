import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "entities/Auth";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { registerFormConfig } from "entities/Auth/model/config/registerFormConfig";
import { TranslationId } from "shared/const/translation";
import { useRegisterMutation } from "entities/Auth/model/api/registerApi";
import { RegisterSchema } from "entities/Auth/model/types/registerSchema";
import cls from "./Register.module.scss";

export const Register = () => {
    const dispatch = useAppDispatch();

    const [register, { isLoading }] = useRegisterMutation();

    const handleRegister = async (values: RegisterSchema) => {
        try {
            const data = await register(values).unwrap();
            dispatch(authActions.setCredentials({ tokens: data.tokens, user: data.user }));
        } catch (error) {
            console.error("Failed to login:", error);
        }
    };

    return (
        <DynamicForm<RegisterSchema>
            className={cls.register}
            config={registerFormConfig}
            onFinish={handleRegister}
            translation={TranslationId.REGISTER}
            loading={isLoading}
        />
    );
};

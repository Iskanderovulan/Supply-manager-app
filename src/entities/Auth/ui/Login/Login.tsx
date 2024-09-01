import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "entities/Auth";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { loginFormConfig } from "entities/Auth/model/config/loginFormConfig";
import { TranslationId } from "shared/const/translation";
import { LoginSchema } from "entities/Auth/model/types/loginSchema";
import { useLoginMutation } from "entities/Auth/model/api/loginApi";
import { App as AntApp } from "antd";
import { authError } from "shared/types/auth";
import cls from "./Login.module.scss";

export const Login = () => {
    const dispatch = useAppDispatch();
    const { notification } = AntApp.useApp();

    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (values: LoginSchema) => {
        try {
            const data = await login(values).unwrap();
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
        <DynamicForm<LoginSchema>
            className={cls.login}
            config={loginFormConfig}
            onFinish={handleLogin}
            translation={TranslationId.LOGIN}
            loading={isLoading}
        />
    );
};

import { useEffect, FC } from "react";
import { useLogoutMutation } from "../api";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { baseApi } from "@shared/api/rtkApi";
import { authActions, selectRefreshToken } from "@features/Auth";
import { TranslationId } from "@shared/const/translation";

export const Logout: FC = () => {
    const [logout, { isLoading, isError, isSuccess, error, reset }] = useLogoutMutation();
    const refreshToken = useAppSelector(selectRefreshToken);
    const dispatch = useAppDispatch();
    const { t } = useTranslation(TranslationId.AUTH);

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.logoutSuccess,
    });

    const handleLogout = () => {
        if (refreshToken) {
            logout({ refreshToken });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(baseApi.util.resetApiState());
            dispatch(authActions.clearToken());
        }
    }, [isSuccess, dispatch]);

    return (
        <Button type="primary" onClick={handleLogout} loading={isLoading} icon={<LogoutOutlined />}>
            {t("logoutButton")}
        </Button>
    );
};

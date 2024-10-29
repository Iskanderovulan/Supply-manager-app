import { useEffect, FC, useCallback } from "react";
import { useLogoutMutation } from "@features/Auth/model/api/logoutApi";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
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
        notificationKey: NotificationData.logoutSuccess.message,
    });

    const handleLogout = useCallback(() => {
        if (refreshToken) {
            logout({ refreshToken });
        }
    }, [refreshToken, logout]);

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

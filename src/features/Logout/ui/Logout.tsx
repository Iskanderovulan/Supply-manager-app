import { FC } from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { selectRefreshToken } from "@entities/auth";
import { useLogoutEffect } from "@entities/auth";
import { useLogoutMutation } from "../api";

export const Logout: FC = () => {
    const [logout, { isLoading, isError, isSuccess, error, reset }] = useLogoutMutation();
    const refreshToken = useAppSelector(selectRefreshToken);
    const { t } = useTranslation(TranslationId.AUTH);

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.logoutSuccess,
    });

    useLogoutEffect({ isSuccess, isError, reset });

    const handleLogout = () => {
        if (refreshToken) {
            logout({ refreshToken });
        }
    };

    return (
        <Button type="primary" onClick={handleLogout} loading={isLoading} icon={<LogoutOutlined />}>
            {t("logoutButton")}
        </Button>
    );
};

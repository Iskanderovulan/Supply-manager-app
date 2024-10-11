import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { App as AntApp } from "antd";
import { useTranslation } from "react-i18next";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";

interface NotificationProps {
    isError: boolean;
    isSuccess: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    notificationKey?: keyof typeof NotificationData;
    reset: () => void;
}

export const useNotification = ({
    isError,
    isSuccess,
    error,
    reset,
    notificationKey = NotificationData.default.message,
}: NotificationProps) => {
    const { notification } = AntApp.useApp();
    const { t } = useTranslation(TranslationId.NOTIFICATION);

    useEffect(() => {
        if (isError && error) {
            const errorMessage =
                "data" in error && error.data
                    ? (error.data as { message?: string })?.message
                    : t(NotificationData.error.description);
            notification.error({
                message: t(NotificationData.error.message),
                description: errorMessage,
                duration: 2,
            });
            reset();
        }

        if (isSuccess) {
            const { message, description } = NotificationData[notificationKey];
            notification.success({
                message: t(message),
                description: t(description),
                duration: 2,
            });
            reset();
        }
    }, [isError, isSuccess, error, notificationKey, notification, t, reset]);
};

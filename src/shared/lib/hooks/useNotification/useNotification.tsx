import { useEffect } from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { App as AntApp } from "antd";
import { useTranslation } from "react-i18next";
import { NotificationData } from "shared/const/notifications";
import { TranslationId } from "shared/const/translation";

export const useNotification = (
    error: FetchBaseQueryError | SerializedError | undefined,
    isSuccess: boolean,
    notificationKey: keyof typeof NotificationData = NotificationData.default.key,
    reset: () => void,
) => {
    const { notification } = AntApp.useApp();
    const { t } = useTranslation(TranslationId.NOTIFICATION);
    console.log(isSuccess);
    useEffect(() => {
        console.log(isSuccess);

        if (error) {
            const errorMessage =
                "data" in error && error.data
                    ? (error.data as { message?: string })?.message
                    : t("unexpectedError");
            notification.error({
                message: t("error"),
                description: errorMessage,
            });
            reset();
        }

        if (isSuccess) {
            const { message, description } = NotificationData[notificationKey];

            notification.success({
                message: t(message),
                description: t(description),
            });
            reset();
        }
    }, [error, isSuccess, notificationKey, notification, t, reset]);
};

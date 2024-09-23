import React from "react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { CustomError } from "shared/types/error";
import { TranslationId } from "shared/const/translation";

interface ErrorMessageProps {
    error: unknown;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    const { t } = useTranslation(TranslationId.NOTIFICATION);
    const customError = error as CustomError;
    const message = customError?.data?.message || t("errorOccurred");
    const code = customError?.data?.code || t("errorCode");

    return <Alert message={code} description={message} type="error" showIcon />;
};

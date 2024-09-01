import React from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { authActions } from "entities/Auth";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export const Logout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const handleLogout = () => {
        dispatch(authActions.clearToken());
    };

    return (
        <Button type="primary" onClick={handleLogout}>
            {t("Logout")}
        </Button>
    );
};

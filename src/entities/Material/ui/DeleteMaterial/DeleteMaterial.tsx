import { FC, useCallback } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons"; // Импортируем иконки
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { useDeleteMaterialMutation } from "@entities/Material/model/api/materialApi";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";

interface DeleteMaterialProps {
    material: MaterialSchema;
}

export const DeleteMaterial: FC<DeleteMaterialProps> = ({ material }) => {
    const { t } = useTranslation(TranslationId.MATERIAL);

    const [deleteMaterial, { isError, isLoading, isSuccess, error, reset }] =
        useDeleteMaterialMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.deleteSuccess.message,
    });

    const handleDelete = useCallback(() => {
        deleteMaterial(material.id);
    }, [deleteMaterial, material.id]);

    const showDeleteConfirm = useCallback(() => {
        Modal.confirm({
            title: t("deleteConfirmation"),
            icon: <ExclamationCircleOutlined />,
            content: t("deleteConfirmationMessage"),
            okText: t("delete"),
            okType: "danger",
            cancelText: t("cancel"),
            className: "modal-custom",
            onOk: handleDelete,
        });
    }, [t, handleDelete]);

    return (
        <Button danger icon={<DeleteOutlined />} onClick={showDeleteConfirm} loading={isLoading}>
            {t("delete")}
        </Button>
    );
};

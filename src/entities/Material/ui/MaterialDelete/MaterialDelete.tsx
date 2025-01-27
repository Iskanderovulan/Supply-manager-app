import { FC } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { useDeleteMaterialMutation } from "@entities/Material/api";

interface MaterialDeleteProps {
    material: MaterialSchema;
}

export const MaterialDelete: FC<MaterialDeleteProps> = ({ material }) => {
    const { t } = useTranslation(TranslationId.MATERIAL);
    const { t: global } = useTranslation();

    const [deleteMaterial, { isError, isLoading, isSuccess, error, reset }] =
        useDeleteMaterialMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.deleteSuccess,
    });

    const handleDelete = () => {
        deleteMaterial(material.id);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: t("deleteMaterial"),
            icon: <ExclamationCircleOutlined />,
            okText: global("delete"),
            okType: "danger",
            cancelText: global("cancel"),
            className: "modal-custom",
            onOk: handleDelete,
        });
    };

    return (
        <Button danger icon={<DeleteOutlined />} onClick={showDeleteConfirm} loading={isLoading}>
            {global("delete")}
        </Button>
    );
};

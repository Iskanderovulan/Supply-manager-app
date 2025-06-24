import { FC } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { ColorSchema } from "@entities/color";
import { useDeleteColorMutation } from "@entities/color";

interface ColorDeleteProps {
    color: ColorSchema;
}

export const ColorDelete: FC<ColorDeleteProps> = ({ color }) => {
    const { t } = useTranslation(TranslationId.COLOR);
    const { t: global } = useTranslation();

    const [deleteColor, { isError, isLoading, isSuccess, error, reset }] = useDeleteColorMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.deleteSuccess,
    });

    const handleDelete = () => {
        deleteColor(color.id);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: t("deleteColor"),
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

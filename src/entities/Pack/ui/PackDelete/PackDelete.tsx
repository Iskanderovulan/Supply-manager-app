import { FC } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { PackSchema } from "@entities/Pack/model/types/packSchema";
import { useDeletePackMutation } from "@entities/Pack/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";

interface PackDeleteProps {
    pack: PackSchema;
}

export const PackDelete: FC<PackDeleteProps> = ({ pack }) => {
    const { t } = useTranslation(TranslationId.PACK);
    const { t: global } = useTranslation();

    const [deletePack, { isError, isLoading, isSuccess, error, reset }] = useDeletePackMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.deleteSuccess,
    });

    const handleDelete = () => {
        deletePack(pack.id);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: t("deletePack"),
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

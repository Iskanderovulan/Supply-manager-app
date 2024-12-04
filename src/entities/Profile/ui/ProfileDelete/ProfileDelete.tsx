import { FC } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteUserMutation } from "@entities/Profile/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";

interface ProfileDeleteProps {
    userId: string;
}

export const ProfileDelete: FC<ProfileDeleteProps> = ({ userId }) => {
    const { t } = useTranslation(TranslationId.PROFILE);
    const { t: global } = useTranslation();

    const [deleteUser, { isError, isLoading, isSuccess, error, reset }] = useDeleteUserMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.deleteSuccess,
    });

    const handleDelete = () => {
        deleteUser(userId);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: t("deleteAccountTitle"),
            content: t("deleteAccountContent"),
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

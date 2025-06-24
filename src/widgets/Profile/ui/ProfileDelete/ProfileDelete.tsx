import { FC, memo } from "react";
import { Modal, Button } from "antd";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { useDeleteUserMutation } from "@entities/profile";
import { useLogoutEffect } from "@entities/auth";

interface ProfileDeleteProps {
    userId: string;
}

export const ProfileDelete: FC<ProfileDeleteProps> = memo(({ userId }) => {
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

    useLogoutEffect({ isSuccess, isError, reset });

    const handleDelete = async () => {
        await deleteUser(userId);
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
});

ProfileDelete.displayName = "ProfileDelete";

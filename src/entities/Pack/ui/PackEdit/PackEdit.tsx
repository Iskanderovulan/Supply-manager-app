import { FC, useEffect } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { PackSchema } from "@entities/Pack/model/types/packSchema";
import { useUpdatePackMutation } from "@entities/Pack/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { editPackFormConfig } from "@entities/Pack/model/config/editPackFormConfig";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

interface PackEditProps {
    pack: PackSchema;
}

export const PackEdit: FC<PackEditProps> = ({ pack }) => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.PACK);
    const { t: global } = useTranslation();

    const [updatePack, { isLoading, isError, isSuccess, reset, error }] = useUpdatePackMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.updateSuccess,
    });

    const handleEditPack = (values: Partial<PackSchema>) => {
        updatePack({ id: pack.id, ...values });
    };

    useEffect(() => {
        if (isSuccess) hideModal();
    }, [isSuccess, hideModal]);

    return (
        <>
            <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                {global("edit")}
            </Button>
            <Modal
                title={t("updatePack")}
                open={isModalOpen}
                onCancel={hideModal}
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {global("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<PackSchema>
                    config={editPackFormConfig(t)}
                    onFinish={handleEditPack}
                    loading={isLoading}
                    updateValues={pack}
                />
            </Modal>
        </>
    );
};

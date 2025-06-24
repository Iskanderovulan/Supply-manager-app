import { FC, useEffect } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { PackSchema } from "@entities/pack";
import { useUpdatePackMutation } from "@entities/pack";
import { editPackFormConfig } from "@widgets/Pack/config/editPackFormConfig";

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
                destroyOnClose
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

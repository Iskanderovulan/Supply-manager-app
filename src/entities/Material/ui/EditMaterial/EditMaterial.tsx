import { FC, useCallback, useEffect } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { useUpdateMaterialMutation } from "@entities/Material/model/api";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { editMaterialFormConfig } from "@entities/Material/model/config/editMaterialFormConfig";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

interface EditMaterialProps {
    material: MaterialSchema;
}

export const EditMaterial: FC<EditMaterialProps> = ({ material }) => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.MATERIAL);

    const [updateMaterial, { isLoading, isError, isSuccess, reset, error }] =
        useUpdateMaterialMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.updateSuccess.message,
    });

    const handleEditMaterial = useCallback(
        (values: Partial<MaterialSchema>) => {
            updateMaterial({ id: material.id, ...values });
        },
        [updateMaterial, material.id],
    );

    // Закрытие модального окна после успешного обновления
    useEffect(() => {
        if (isSuccess) hideModal();
    }, [isSuccess, hideModal]);

    return (
        <>
            <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                {t("edit")}
            </Button>
            <Modal
                title={t("updateMaterial")}
                open={isModalOpen}
                onCancel={hideModal}
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {t("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<MaterialSchema>
                    config={editMaterialFormConfig(t)}
                    onFinish={handleEditMaterial}
                    loading={isLoading}
                    updateValues={material}
                />
            </Modal>
        </>
    );
};

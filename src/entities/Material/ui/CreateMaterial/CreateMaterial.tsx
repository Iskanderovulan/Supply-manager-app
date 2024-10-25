import { FC } from "react";
import { Modal, Button } from "antd";
import { useModal } from "@shared/lib/hooks/useModal/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { materialFormConfig } from "@entities/Material/model/config/materialFormConfig";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { useCreateMaterialMutation } from "@entities/Material/model/api/materialApi";
import { useNotification } from "@shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

export const CreateMaterial: FC = () => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.MATERIAL);

    const [createMaterial, { error, isError, isLoading, isSuccess, reset }] =
        useCreateMaterialMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.createSuccess.message,
    });

    const handleCreateMaterial = (values: MaterialSchema) => {
        createMaterial(values);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {t("createMaterial")}
            </Button>
            <Modal
                title={t("createMaterial")}
                open={isModalOpen}
                onCancel={hideModal}
                cancelText={t("cancel")}
                okText={t("ok")}
            >
                <DynamicForm<MaterialSchema>
                    config={materialFormConfig(t)}
                    onFinish={handleCreateMaterial}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
};

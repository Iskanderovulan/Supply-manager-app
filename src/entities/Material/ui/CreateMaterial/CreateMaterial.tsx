import React from "react";
import { Modal, Button } from "antd";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { createMaterialFormConfig } from "entities/Material/model/config/createMaterialFormConfig";
import { MaterialSchema } from "entities/Material/model/types/materialSchema";
import { useCreateMaterialMutation } from "entities/Material/model/api/materialApi";
import { useNotification } from "shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "shared/const/notifications";

export const CreateMaterial: React.FC = () => {
    const { isModalOpen, showModal, hideModal } = useModal();

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
                Create Material
            </Button>
            <Modal title="Create Material" open={isModalOpen} onCancel={hideModal}>
                <DynamicForm<MaterialSchema>
                    config={createMaterialFormConfig}
                    onFinish={handleCreateMaterial}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
};

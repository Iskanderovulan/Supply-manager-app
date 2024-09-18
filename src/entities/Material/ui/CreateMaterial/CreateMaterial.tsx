import React from "react";
import { Modal, Button } from "antd";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { DynamicForm } from "shared/ui/DynamicForm/DynamicForm";
import { createMaterialFormConfig } from "entities/Material/model/config/createMaterialFormConfig";
import { MaterialSchema } from "entities/Material/model/types/materialSchema";
import { useCreateMaterialMutation } from "entities/Material/model/api/materialApi"; // RTK Query хук
import { useNotification } from "shared/lib/hooks/useNotification/useNotification";
import { NotificationData } from "shared/const/notifications";

export const CreateMaterial: React.FC = () => {
    const { isModalOpen, showModal, hideModal } = useModal();

    const [createMaterial, { error, isLoading, isSuccess, reset }] = useCreateMaterialMutation();
    console.log(isSuccess);

    useNotification(error, isSuccess, NotificationData.createSuccess.key, reset);

    const handleCreateMaterial = async (values: MaterialSchema) => {
        try {
            const data = await createMaterial(values).unwrap();
            console.log(data);
        } catch (err) {
            console.error("Ошибка при создании материала:", err);
        }
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
                    loading={isLoading} // Индикатор загрузки
                />
            </Modal>
        </>
    );
};

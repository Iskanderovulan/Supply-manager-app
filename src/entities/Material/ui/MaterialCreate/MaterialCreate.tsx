import { FC, useEffect, memo } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { createMaterialFormConfig } from "@entities/Material/model/config/createMaterialFormConfig";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { useCreateMaterialMutation } from "@entities/Material/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

export const MaterialCreate: FC = memo(() => {
    const { isModalOpen, showModal, hideModal } = useModal();

    const { t } = useTranslation(TranslationId.MATERIAL);
    const { t: global } = useTranslation();

    const [createMaterial, { error, isError, isLoading, isSuccess, reset }] =
        useCreateMaterialMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.createSuccess,
    });

    const handleCreateMaterial = (values: MaterialSchema) => {
        createMaterial(values);
    };

    useEffect(() => {
        if (isSuccess) hideModal();
    }, [isSuccess, hideModal]);

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                {t("createMaterial")}
            </Button>
            <Modal
                title={t("createMaterial")}
                open={isModalOpen}
                onCancel={hideModal}
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {global("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<MaterialSchema>
                    config={createMaterialFormConfig(t)}
                    onFinish={handleCreateMaterial}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
});

MaterialCreate.displayName = "MaterialCreate";

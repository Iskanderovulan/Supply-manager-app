import { FC, useCallback, useEffect } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { materialFormConfig } from "@entities/Material/model/config/materialFormConfig";
import { MaterialSchema } from "@entities/Material/model/types/materialSchema";
import { useCreateMaterialMutation } from "@entities/Material/model/api";
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

    const handleCreateMaterial = useCallback(
        (values: MaterialSchema) => {
            createMaterial(values);
        },
        [createMaterial],
    );

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
                        {t("cancel")}
                    </Button>,
                ]}
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

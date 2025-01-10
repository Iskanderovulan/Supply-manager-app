import { FC, useEffect, memo } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { createPackFormConfig } from "@entities/Pack/model/config/createPackFormConfig";
import { PackSchema } from "@entities/Pack/model/types/packSchema";
import { useCreatePackMutation } from "@entities/Pack/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

export const PackCreate: FC = memo(() => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.PACK);
    const { t: global } = useTranslation();
    const [createPack, { error, isError, isLoading, isSuccess, reset }] = useCreatePackMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.createSuccess,
    });

    const handleCreatePack = (values: PackSchema) => {
        createPack(values);
    };

    useEffect(() => {
        if (isSuccess) hideModal();
    }, [isSuccess, hideModal]);

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                {t("createPack")}
            </Button>
            <Modal
                title={t("createPack")}
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
                    config={createPackFormConfig(t)}
                    onFinish={handleCreatePack}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
});

PackCreate.displayName = "PackCreate";

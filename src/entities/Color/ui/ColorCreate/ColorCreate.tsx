import { FC, useEffect, memo } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { createColorFormConfig } from "@entities/Color/config/createColorFormConfig";
import { ColorSchema } from "@entities/Color/model/types/colorSchema";
import { useCreateColorMutation } from "@entities/Color/api";

export const ColorCreate: FC = memo(() => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.COLOR);
    const { t: global } = useTranslation();
    const [createColor, { error, isError, isLoading, isSuccess, reset }] = useCreateColorMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.createSuccess,
    });

    const handleCreateColor = (values: ColorSchema) => {
        createColor(values);
    };

    useEffect(() => {
        if (isSuccess) hideModal();
    }, [isSuccess, hideModal]);

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                {t("createColor")}
            </Button>
            <Modal
                title={t("createColor")}
                open={isModalOpen}
                onCancel={hideModal}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {global("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<ColorSchema>
                    config={createColorFormConfig(t)}
                    onFinish={handleCreateColor}
                    loading={isLoading}
                />
            </Modal>
        </>
    );
});

ColorCreate.displayName = "ColorCreate";

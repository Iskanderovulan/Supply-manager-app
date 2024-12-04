import { FC, useEffect } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { ColorSchema } from "@entities/Color/model/types/colorSchema";
import { useUpdateColorMutation } from "@entities/Color/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { editColorFormConfig } from "@entities/Color/model/config/editColorFormConfig";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";

interface ColorEditProps {
    color: ColorSchema;
}

export const ColorEdit: FC<ColorEditProps> = ({ color }) => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.COLOR);
    const { t: global } = useTranslation();

    const [updateColor, { isLoading, isError, isSuccess, reset, error }] = useUpdateColorMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.updateSuccess,
    });

    const handleEditColor = (values: Partial<ColorSchema>) => {
        updateColor({ id: color.id, ...values });
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
                title={t("updateColor")}
                open={isModalOpen}
                onCancel={hideModal}
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {global("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<ColorSchema>
                    config={editColorFormConfig(t)}
                    onFinish={handleEditColor}
                    loading={isLoading}
                    updateValues={color}
                />
            </Modal>
        </>
    );
};

import { FC, useEffect } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { ColorSchema } from "@entities/color";
import { useUpdateColorMutation } from "@entities/color";
import { editColorFormConfig } from "@widgets/Color/config/editColorFormConfig";

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
                destroyOnClose
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

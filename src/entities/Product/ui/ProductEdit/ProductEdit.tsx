import { FC, useEffect } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";
import { useUpdateProductMutation } from "@entities/Product/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { editProductFormConfig } from "@entities/Product/model/config/editProductFormConfig";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";
import { ProductClassificatorsSchema } from "@entities/Product/model/types/ProductClassificatorsSchema";

interface ProductEditProps extends ProductClassificatorsSchema {
    product: ProductSchema;
}

export const ProductEdit: FC<ProductEditProps> = ({
    product,
    materialOptions,
    colorOptions,
    packOptions,
}) => {
    const { isModalOpen, showModal, hideModal } = useModal();
    const { t } = useTranslation(TranslationId.PRODUCT);
    const { t: global } = useTranslation();

    const [updateProduct, { isLoading, isError, isSuccess, reset, error }] =
        useUpdateProductMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.updateSuccess,
    });

    const handleEditProduct = (values: Partial<ProductSchema>) => {
        updateProduct({ id: product.id, ...values });
    };

    useEffect(() => {
        if (isSuccess) hideModal();
    }, [isSuccess, hideModal]);

    const formConfig = editProductFormConfig(t, {
        materialOptions,
        colorOptions,
        packOptions,
    });

    return (
        <>
            <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                {global("edit")}
            </Button>
            <Modal
                title={t("updateProduct")}
                open={isModalOpen}
                onCancel={hideModal}
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {global("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<ProductSchema>
                    config={formConfig}
                    onFinish={handleEditProduct}
                    loading={isLoading}
                    updateValues={product}
                />
            </Modal>
        </>
    );
};

import { FC, useEffect, useMemo } from "react";
import { Modal, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { useUpdateProductMutation } from "@entities/product";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { ProductSchema } from "@entities/product";
import { editProductFormConfig } from "@widgets/Product/config/editProductFormConfig";
import { ProductClassificatorsSchema } from "@widgets/Product/model/ProductClassificatorsSchema";

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

    const transformProductForForm = (product: ProductSchema) => {
        return {
            ...product,
            material: product.material?.id || "",
            color: product.color?.id || "",
            pack: product.pack?.id || "",
        };
    };

    const formValues = useMemo(() => transformProductForForm(product), [product]);

    return (
        <>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={showModal}
                data-testid={`edit-product-${product.id}`}
            >
                {global("edit")}
            </Button>
            <Modal
                title={t("updateProduct")}
                open={isModalOpen}
                onCancel={hideModal}
                destroyOnClose
                footer={[
                    <Button key="cancel" onClick={hideModal}>
                        {global("cancel")}
                    </Button>,
                ]}
            >
                <DynamicForm<typeof formValues & ProductSchema>
                    config={formConfig}
                    onFinish={handleEditProduct}
                    loading={isLoading}
                    updateValues={formValues}
                />
            </Modal>
        </>
    );
};

import { FC, useEffect, memo } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { createProductFormConfig } from "@entities/Product/config/createProductFormConfig";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";
import { useCreateProductMutation } from "@entities/Product/api";
import { ProductClassificatorsSchema } from "@entities/Product/model/types/ProductClassificatorsSchema";

interface ProductCreateProps extends ProductClassificatorsSchema {}

export const ProductCreate: FC<ProductCreateProps> = memo(
    ({ materialOptions, colorOptions, packOptions }) => {
        const { isModalOpen, showModal, hideModal } = useModal();
        const { t } = useTranslation(TranslationId.PRODUCT);
        const { t: global } = useTranslation();

        const [createProduct, { error, isError, isLoading, isSuccess, reset }] =
            useCreateProductMutation();

        useNotification({
            isError,
            isSuccess,
            error,
            reset,
            notificationKey: NotificationData.createSuccess,
        });

        const handleCreateProduct = (values: ProductSchema) => {
            createProduct(values);
        };

        useEffect(() => {
            if (isSuccess) hideModal();
        }, [isSuccess, hideModal]);

        const formConfig = createProductFormConfig(t, {
            materialOptions,
            colorOptions,
            packOptions,
        });

        return (
            <>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                    {t("createProduct")}
                </Button>
                <Modal
                    title={t("createProduct")}
                    open={isModalOpen}
                    onCancel={hideModal}
                    destroyOnClose
                    footer={[
                        <Button key="cancel" onClick={hideModal}>
                            {global("cancel")}
                        </Button>,
                    ]}
                >
                    <DynamicForm<ProductSchema>
                        config={formConfig}
                        onFinish={handleCreateProduct}
                        loading={isLoading}
                    />
                </Modal>
            </>
        );
    },
);

ProductCreate.displayName = "ProductCreate";

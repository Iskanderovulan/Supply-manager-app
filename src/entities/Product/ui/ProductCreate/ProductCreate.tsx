import { FC, useEffect, memo } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useModal } from "@shared/lib/hooks/useModal";
import { DynamicForm } from "@shared/ui/DynamicForm";
import { createProductFormConfig } from "@entities/Product/model/config/createProductFormConfig";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";
import { useCreateProductMutation } from "@entities/Product/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { useTranslation } from "react-i18next";
import { ProductClassificatorsSchema } from "@entities/Product/model/types/ProductClassificatorsSchema";

interface ProductCreateProps extends ProductClassificatorsSchema {}

export const ProductCreate: FC<ProductCreateProps> = memo(
    ({ materialOptions, colorOptions, packOptions }) => {
        const { isModalOpen, showModal, hideModal } = useModal();
        const { t } = useTranslation(TranslationId.PRODUCT);
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

        // Обновляем конфигурацию формы с динамическими опциями
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
                    footer={[
                        <Button key="cancel" onClick={hideModal}>
                            {t("cancel")}
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

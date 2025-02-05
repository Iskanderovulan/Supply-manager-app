import { FC } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { TranslationId } from "@shared/const/translation";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";
import { useDeleteProductMutation } from "@entities/Product/api";

interface ProductDeleteProps {
    product: ProductSchema;
}

export const ProductDelete: FC<ProductDeleteProps> = ({ product }) => {
    const { t } = useTranslation(TranslationId.PRODUCT);
    const { t: global } = useTranslation();

    const [deleteProduct, { isError, isLoading, isSuccess, error, reset }] =
        useDeleteProductMutation();

    useNotification({
        isError,
        isSuccess,
        error,
        reset,
        notificationKey: NotificationData.deleteSuccess,
    });

    const handleDelete = () => {
        deleteProduct(product.id);
    };

    const showDeleteConfirm = () => {
        Modal.confirm({
            title: t("deleteProduct"),
            icon: <ExclamationCircleOutlined />,
            okText: global("delete"),
            okType: "danger",
            cancelText: global("cancel"),
            className: "modal-custom",
            okButtonProps: { "data-testid": "confirm-delete" },
            onOk: handleDelete,
        });
    };

    return (
        <Button
            danger
            icon={<DeleteOutlined />}
            onClick={showDeleteConfirm}
            loading={isLoading}
            data-testid={`delete-product-${product.id}`}
        >
            {global("delete")}
        </Button>
    );
};

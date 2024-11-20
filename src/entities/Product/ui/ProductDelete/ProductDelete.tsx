import { FC } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductSchema } from "@entities/Product/model/types/ProductSchema";
import { useDeleteProductMutation } from "@entities/Product/api";
import { useNotification } from "@shared/lib/hooks/useNotification";
import { NotificationData } from "@shared/const/notifications";
import { useTranslation } from "react-i18next";
import { TranslationId } from "@shared/const/translation";

interface ProductDeleteProps {
    product: ProductSchema;
}

export const ProductDelete: FC<ProductDeleteProps> = ({ product }) => {
    const { t } = useTranslation(TranslationId.PRODUCT);
    const { t: globalT } = useTranslation();

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
            okText: globalT("delete"),
            okType: "danger",
            cancelText: globalT("cancel"),
            className: "modal-custom",
            onOk: handleDelete,
        });
    };

    return (
        <Button danger icon={<DeleteOutlined />} onClick={showDeleteConfirm} loading={isLoading}>
            {globalT("delete")}
        </Button>
    );
};

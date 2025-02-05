import { FC } from "react";
import { App as AntApp, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { generateDate } from "@shared/lib/helpers/generateDate/generateDate";
import { TranslationId } from "@shared/const/translation";
import { ProductSchema } from "@entities/Product";

interface DetailsCopyProps {
    product: ProductSchema;
}

export const DetailsCopy: FC<DetailsCopyProps> = ({ product }) => {
    const { id, name, description, price, createdAt, updatedAt, material, color, pack } = product;
    const { notification } = AntApp.useApp();
    const { t } = useTranslation(TranslationId.PRODUCT);
    const { t: notify } = useTranslation(TranslationId.NOTIFICATION);

    const handleCopy = async () => {
        const cardContent = `
        ${t("id")}: ${id}
        ${t("name")}: ${name}
        ${t("description")}: ${description}
        ${t("price")}: ${price} USD
        ${t("material")}: ${material?.name}
        ${t("color")}: ${color?.name}
        ${t("pack")}: ${pack?.name}
        ${t("createdAt")}: ${generateDate(createdAt)}
        ${t("updatedAt")}: ${generateDate(updatedAt)}
    `;

        try {
            await navigator.clipboard.writeText(cardContent.trim());
            notification.success({
                message: notify("copySuccess"),
                duration: 2,
            });
        } catch (error) {
            notification.error({
                message: notify("copyError"),
                duration: 2,
            });
        }
    };

    return <Button type="primary" icon={<CopyOutlined />} onClick={handleCopy} />;
};

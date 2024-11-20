import { TFunction } from "i18next";
import { ProductClassificatorsSchema } from "../types/ProductClassificatorsSchema";

export const createProductFormConfig = (t: TFunction, options: ProductClassificatorsSchema) => ({
    fields: [
        {
            label: t("productName"),
            name: "name",
            type: "text",
            placeholder: t("enterProductName"),
            rules: [{ required: true, message: t("pleaseInputProductName") }],
        },
        {
            label: t("description"),
            name: "description",
            type: "textarea",
            placeholder: t("enterProductDescription"),
            rules: [{ required: true, message: t("pleaseInputProductDescription") }],
        },
        {
            label: t("price"),
            name: "price",
            type: "number",
            placeholder: t("enterProductPrice"),
            rules: [
                { required: true, message: t("pleaseInputProductPrice") },
                { required: true, message: t("priceMustBePositive") },
            ],
        },
        {
            label: t("material"),
            name: "material",
            type: "select",
            placeholder: t("selectMaterial"),
            options: options.materialOptions,
            rules: [{ required: true, message: t("pleaseSelectMaterial") }],
        },
        {
            label: t("color"),
            name: "color",
            type: "select",
            placeholder: t("selectColor"),
            options: options.colorOptions,
            rules: [{ required: true, message: t("pleaseSelectColor") }],
        },
        {
            label: t("pack"),
            name: "pack",
            type: "select",
            placeholder: t("selectPack"),
            options: options.packOptions,
            rules: [{ required: true, message: t("pleaseSelectPack") }],
        },
    ],
    buttons: [
        {
            label: t("createProduct"),
            type: "primary",
            htmlType: "submit",
        },
    ],
});

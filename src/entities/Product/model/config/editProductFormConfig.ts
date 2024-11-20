import { ProductClassificatorsSchema } from "../types/ProductClassificatorsSchema";
import { TFunction } from "i18next";
import { createProductFormConfig } from "./createProductFormConfig";

export const editProductFormConfig = (t: TFunction, options: ProductClassificatorsSchema) => {
    const config = createProductFormConfig(t, options);
    config.buttons[0].label = t("editProduct");
    return config;
};

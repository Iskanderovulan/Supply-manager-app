import { TFunction } from "i18next";
import { ProductClassificatorsSchema } from "../model/ProductClassificatorsSchema";
import { createProductFormConfig } from "./createProductFormConfig";

export const editProductFormConfig = (t: TFunction, options: ProductClassificatorsSchema) => {
    const config = createProductFormConfig(t, options);
    config.buttons[0].label = t("editProduct");
    return config;
};

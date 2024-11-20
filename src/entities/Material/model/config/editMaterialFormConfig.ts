import { createMaterialFormConfig } from "./createMaterialFormConfig";
import { TFunction } from "i18next";

export const editMaterialFormConfig = (t: TFunction) => {
    const config = JSON.parse(JSON.stringify(createMaterialFormConfig(t)));
    config.buttons[0].label = t("editMaterial");
    return config;
};

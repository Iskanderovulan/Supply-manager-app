import { materialFormConfig } from "./materialFormConfig";
import { TFunction } from "i18next";

export const editMaterialFormConfig = (t: TFunction) => {
    const config = JSON.parse(JSON.stringify(materialFormConfig(t)));
    config.buttons[0].label = t("editMaterial");
    return config;
};

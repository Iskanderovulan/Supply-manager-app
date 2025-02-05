import { TFunction } from "i18next";
import { createPackFormConfig } from "./createPackFormConfig";

export const editPackFormConfig = (t: TFunction) => {
    const config = JSON.parse(JSON.stringify(createPackFormConfig(t)));
    config.buttons[0].label = t("editPack");
    return config;
};

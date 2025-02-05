import { TFunction } from "i18next";
import { createColorFormConfig } from "./createColorFormConfig";

export const editColorFormConfig = (t: TFunction) => {
    const config = JSON.parse(JSON.stringify(createColorFormConfig(t)));
    config.buttons[0].label = t("editColor");
    return config;
};

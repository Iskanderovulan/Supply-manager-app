import { createColorFormConfig } from "./createColorFormConfig";
import { TFunction } from "i18next";

export const editColorFormConfig = (t: TFunction) => {
    const config = JSON.parse(JSON.stringify(createColorFormConfig(t)));
    config.buttons[0].label = t("editColor");
    return config;
};

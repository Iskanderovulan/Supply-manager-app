import { intensityOptions } from "../const/intensityOptions";
import { TFunction } from "i18next";

export const createColorFormConfig = (t: TFunction) => ({
    fields: [
        {
            label: t("colorName"),
            name: "name",
            type: "text",
            placeholder: t("enterColorName"),
            rules: [{ required: true, message: t("pleaseInputColorName") }],
        },
        {
            label: t("intensity"),
            name: "intensity",
            type: "select",
            placeholder: t("selectIntensity"),
            options: intensityOptions.map((option) => ({
                ...option,
                label: t(option.label),
            })),
            rules: [{ required: true, message: t("pleaseSelectIntensity") }],
        },
    ],
    buttons: [
        {
            label: t("createColor"),
            type: "primary",
            htmlType: "submit",
        },
    ],
});

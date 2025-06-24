import { TFunction } from "i18next";
import { hardnessOptions } from "../const/hardnessOptions";

export const createMaterialFormConfig = (t: TFunction) => ({
    fields: [
        {
            label: t("materialName"),
            name: "name",
            type: "text",
            placeholder: t("enterMaterialName"),
            rules: [{ required: true, message: t("pleaseInputMaterialName") }],
        },
        {
            label: t("hardness"),
            name: "hardness",
            type: "select",
            placeholder: t("selectHardness"),
            options: hardnessOptions.map((option) => ({
                ...option,
                label: t(option.label),
            })),
            rules: [{ required: true, message: t("pleaseSelectHardness") }],
        },
    ],
    buttons: [
        {
            label: t("createMaterial"),
            type: "primary",
            htmlType: "submit",
        },
    ],
});

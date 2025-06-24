import { TFunction } from "i18next";
import { typeOptions } from "@widgets/Pack/const/typeOptions";

export const createPackFormConfig = (t: TFunction) => ({
    fields: [
        {
            label: t("packName"),
            name: "name",
            type: "text",
            placeholder: t("enterPackName"),
            rules: [{ required: true, message: t("pleaseInputPackName") }],
        },
        {
            label: t("type"),
            name: "type",
            type: "select",
            placeholder: t("selectType"),
            options: typeOptions.map((option) => ({
                ...option,
                label: t(option.label),
            })),
            rules: [{ required: true, message: t("pleaseSelectType") }],
        },
    ],
    buttons: [
        {
            label: t("createPack"),
            type: "primary",
            htmlType: "submit",
        },
    ],
});

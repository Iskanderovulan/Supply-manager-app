import { hardnessOptions } from "../const/hardnessOptions";

export const materialFormConfig = {
    fields: [
        {
            label: "materialName",
            name: "name",
            type: "text",
            placeholder: "enterMaterialName",
            rules: [{ required: true, message: "pleaseInputMaterialName" }],
        },
        {
            label: "hardness",
            name: "hardness",
            type: "select",
            placeholder: "selectHardness",
            options: hardnessOptions,
            rules: [{ required: true, message: "pleaseSelectHardness" }],
        },
    ],
    buttons: [
        {
            label: "createMaterial",
            type: "primary",
            htmlType: "submit",
        },
    ],
};

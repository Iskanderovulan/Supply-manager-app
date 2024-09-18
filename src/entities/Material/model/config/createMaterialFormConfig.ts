import { hardnessOptions } from "../const/material";

export const createMaterialFormConfig = {
    fields: [
        {
            label: "Material Name",
            name: "name",
            type: "text",
            placeholder: "Enter material name",
            rules: [{ required: true, message: "Please input the material name!" }],
        },
        {
            label: "Hardness",
            name: "hardness",
            type: "select",
            placeholder: "Select hardness",
            options: hardnessOptions,
            rules: [{ required: true, message: "Please select the hardness!" }],
        },
    ],
    buttons: [
        {
            label: "Create",
            type: "primary",
            htmlType: "submit",
        },
    ],
};

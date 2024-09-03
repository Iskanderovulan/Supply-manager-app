import { emailPattern } from "shared/lib/validators/authValidators";
import { passwordPattern } from "shared/lib/validators/authValidators";
import { namePattern } from "shared/lib/validators/authValidators";

export const registerFormConfig = {
    fields: [
        {
            label: "nameLabel",
            name: "name",
            type: "text",
            placeholder: "namePlaceholder",
            rules: [
                { required: true, message: "nameRequired" },
                { pattern: namePattern, message: "nameInvalid" },
            ],
        },
        {
            label: "emailLabel",
            name: "email",
            type: "email",
            placeholder: "emailPlaceholder",
            rules: [
                { required: true, message: "emailRequired" },
                { pattern: emailPattern, message: "emailInvalid" },
            ],
        },
        {
            label: "passwordLabel",
            name: "password",
            type: "password",
            placeholder: "passwordPlaceholder",
            rules: [
                { required: true, message: "passwordRequired" },
                {
                    pattern: passwordPattern,
                    message: "passwordInvalid",
                },
            ],
        },
    ],
    buttons: [
        {
            label: "registerButton",
            type: "primary",
            htmlType: "submit",
        },
    ],
};

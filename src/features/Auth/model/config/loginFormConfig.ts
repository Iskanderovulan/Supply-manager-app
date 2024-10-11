import { emailPattern } from "@shared/lib/validators/authValidators";
import { passwordPattern } from "@shared/lib/validators/authValidators";

export const loginFormConfig = {
    fields: [
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
            label: "loginButton",
            type: "primary",
            htmlType: "submit",
        },
    ],
};

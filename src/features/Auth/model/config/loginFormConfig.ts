import { emailPattern, passwordPattern } from "@shared/lib/validators/authValidators";
import { TFunction } from "i18next";

export const loginFormConfig = (t: TFunction) => ({
    fields: [
        {
            label: t("emailLabel"),
            name: "email",
            type: "email",
            placeholder: t("emailPlaceholder"),
            rules: [
                { required: true, message: t("emailRequired") },
                { pattern: emailPattern, message: t("emailInvalid") },
            ],
        },
        {
            label: t("passwordLabel"),
            name: "password",
            type: "password",
            placeholder: t("passwordPlaceholder"),
            rules: [
                { required: true, message: t("passwordRequired") },
                {
                    pattern: passwordPattern,
                    message: t("passwordInvalid"),
                },
            ],
        },
    ],
    buttons: [
        {
            label: t("loginButton"),
            type: "primary",
            htmlType: "submit",
        },
    ],
});

import { emailPattern, passwordPattern, namePattern } from "@shared/lib/validators/authValidators";
import { TFunction } from "i18next";

export const registerFormConfig = (t: TFunction) => ({
    fields: [
        {
            label: t("nameLabel"),
            name: "name",
            type: "text",
            placeholder: t("namePlaceholder"),
            rules: [
                { required: true, message: t("nameRequired") },
                { pattern: namePattern, message: t("nameInvalid") },
            ],
        },
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
                { pattern: passwordPattern, message: t("passwordInvalid") },
            ],
        },
    ],
    buttons: [
        {
            label: t("registerButton"),
            type: "primary",
            htmlType: "submit",
        },
    ],
});

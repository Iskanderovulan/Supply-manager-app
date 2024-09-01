export const registerFormConfig = {
    fields: [
        {
            label: "nameLabel",
            name: "name",
            type: "text",
            placeholder: "namePlaceholder",
            rules: [{ required: true, message: "nameRequired" }],
        },
        {
            label: "emailLabel",
            name: "email",
            type: "email",
            placeholder: "emailPlaceholder",
            rules: [{ required: true, message: "emailRequired" }],
        },
        {
            label: "passwordLabel",
            name: "password",
            type: "password",
            placeholder: "passwordPlaceholder",
            rules: [{ required: true, message: "passwordRequired" }],
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

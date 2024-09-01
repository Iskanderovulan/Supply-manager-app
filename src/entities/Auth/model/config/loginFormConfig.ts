export const loginFormConfig = {
    fields: [
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
            label: "loginButton",
            type: "primary",
            htmlType: "submit",
        },
    ],
};

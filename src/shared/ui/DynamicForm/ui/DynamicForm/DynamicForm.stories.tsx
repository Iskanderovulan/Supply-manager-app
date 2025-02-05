import { StoryFn, Meta } from "@storybook/react";
import { DynamicForm, DynamicFormProps } from "./DynamicForm";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "shared/DynamicForm",
    component: DynamicForm,
} as Meta<typeof DynamicForm>;

interface FormValues {
    username: string;
    password: string;
    role: string;
}

const Template: StoryFn<DynamicFormProps<FormValues>> = (args) => <DynamicForm {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    config: {
        fields: [
            {
                label: "Username",
                name: "username",
                type: "text",
                placeholder: "Enter your username",
                rules: [{ required: true, message: "Username is required" }],
            },
            {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Enter your password",
                rules: [{ required: true, message: "Password is required" }],
            },
            {
                label: "Material",
                name: "material",
                type: "select",
                placeholder: "Select material",
                options: [
                    { label: "Kraft", value: "kraft" },
                    { label: "Poly", value: "poly" },
                ],
                rules: [{ required: true, message: "Role is required" }],
            },
        ],
        buttons: [
            { label: "Submit", type: "primary", htmlType: "submit" },
            { label: "Cancel", type: "default", htmlType: "button", onClick: "cancel" },
        ],
    },
    onFinish: (values) => console.log("Form submitted:", values),
    handlers: {
        cancel: () => console.log("Cancel button clicked"),
    },
    loading: false,
    updateValues: {
        username: "user",
    },
};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    ...LightTheme.args,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

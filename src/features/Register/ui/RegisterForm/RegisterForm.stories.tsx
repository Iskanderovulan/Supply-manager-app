import { StoryFn, Meta } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { RegisterSchema } from "@features/Register/model/registerSchema";
import { RememberMeSchema } from "@entities/Auth";

export default {
    title: "features/RegisterForm",
    component: RegisterForm,
} as Meta<typeof RegisterForm>;

const Template: StoryFn<typeof RegisterForm> = (args) => <RegisterForm {...args} />;

export const Light = Template.bind({});
Light.args = {
    isLoading: false,
    onFinish: (values: RegisterSchema & RememberMeSchema) => {
        console.log("Register form submitted:", values);
    },
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const LoadingLight = Template.bind({});
LoadingLight.args = {
    ...Light.args,
    isLoading: true,
};
LoadingLight.decorators = [ThemeDecorator(Theme.LIGHT)];

export const LoadingDark = Template.bind({});
LoadingDark.args = {
    ...Light.args,
    isLoading: true,
};
LoadingDark.decorators = [ThemeDecorator(Theme.DARK)];

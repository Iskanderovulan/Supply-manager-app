import { StoryFn, Meta } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { RememberMeSchema } from "@entities/auth";
import { LoginSchema } from "@features/login/model/loginSchema";

export default {
    title: "features/LoginForm",
    component: LoginForm,
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Light = Template.bind({});
Light.args = {
    isLoading: false,
    onFinish: (values: LoginSchema & RememberMeSchema) => {
        console.log("Login form submitted:", values);
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

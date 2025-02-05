import { StoryFn, Meta } from "@storybook/react";
import { ErrorMessage, ErrorMessageProps } from "./ErrorMessage";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "Shared/ErrorMessage",
    component: ErrorMessage,
} as Meta<typeof ErrorMessage>;

const Template: StoryFn<ErrorMessageProps> = (args) => <ErrorMessage {...args} />;

export const DefaultError = Template.bind({});
DefaultError.args = {
    error: {
        data: {
            message: "An unexpected error occurred. Please try again later.",
            code: "500",
        },
    },
};
DefaultError.decorators = [ThemeDecorator(Theme.LIGHT)];

export const ValidationError = Template.bind({});
ValidationError.args = {
    error: {
        data: {
            message: "Invalid input data. Please check your form fields.",
            code: "400",
        },
    },
};
ValidationError.decorators = [ThemeDecorator(Theme.LIGHT)];

export const NoCustomError = Template.bind({});
NoCustomError.args = {
    error: null,
};
NoCustomError.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    error: {
        data: {
            message: "An unexpected error occurred. Please try again later.",
            code: "500",
        },
    },
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

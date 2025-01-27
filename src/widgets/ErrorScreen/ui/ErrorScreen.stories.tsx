import { StoryFn, Meta } from "@storybook/react";
import { ErrorScreen } from "./ErrorScreen";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "widgets/ErrorScreen",
    component: ErrorScreen,
} as Meta<typeof ErrorScreen>;

const Template: StoryFn<typeof ErrorScreen> = () => <ErrorScreen />;

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

import { StoryFn, Meta } from "@storybook/react";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { Loader } from "./Loader";

export default {
    title: "shared/Loader",
    component: Loader,
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = () => <Loader />;

export const LightTheme = Template.bind({});
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

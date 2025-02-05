import { StoryFn, Meta } from "@storybook/react";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "features/LangSwitcher",
    component: LangSwitcher,
} as Meta<typeof LangSwitcher>;

const Template: StoryFn<typeof LangSwitcher> = () => <LangSwitcher />;

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

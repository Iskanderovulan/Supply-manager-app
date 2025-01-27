import { StoryFn, Meta } from "@storybook/react";
import { NotFoundPage } from "./NotFoundPage";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { RouterDecorator } from "@shared/config/storybook/RouterDecorator/RouterDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "Pages/NotFoundPage",
    component: NotFoundPage,
    decorators: [RouterDecorator],
} as Meta<typeof NotFoundPage>;

const Template: StoryFn<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

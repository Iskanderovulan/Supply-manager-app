import { StoryFn, Meta } from "@storybook/react";
import { HomeOutlined } from "@ant-design/icons";
import { CrumbItem, CrumbItemProps } from "./CrumbItem";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "shared/CrumbItem",
    component: CrumbItem,
} as Meta<typeof CrumbItem>;

const Template: StoryFn<CrumbItemProps> = (args) => <CrumbItem {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    icon: <HomeOutlined />,
    text: "Home",
};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    ...LightTheme.args,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

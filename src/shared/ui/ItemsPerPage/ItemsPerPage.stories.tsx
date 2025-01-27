import { StoryFn, Meta } from "@storybook/react";
import { ItemsPerPage, ItemsPerPageProps } from "./ItemsPerPage";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "shared/ItemsPerPage",
    component: ItemsPerPage,
} as Meta<typeof ItemsPerPage>;

const Template: StoryFn<ItemsPerPageProps> = (args) => <ItemsPerPage {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    limit: 10,
    onLimitChange: (newLimit) => {
        console.log(`Limit changed to: ${newLimit}`);
    },
};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    ...LightTheme.args,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

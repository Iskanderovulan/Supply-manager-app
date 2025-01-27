import { StoryFn, Meta } from "@storybook/react";
import { ColumnManager, ColumnManagerProps } from "./ColumnManager";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { RouterDecorator } from "@shared/config/storybook/RouterDecorator/RouterDecorator";

export default {
    title: "shared/ColumnManager",
    component: ColumnManager,
    decorators: [RouterDecorator],
} as Meta<typeof ColumnManager>;

const Template: StoryFn<ColumnManagerProps> = (args) => <ColumnManager {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    columnsConfig: [
        { key: "name", title: "Name" },
        { key: "age", title: "Age" },
        { key: "address", title: "Address" },
    ],
    visibleColumns: ["name", "age"],
    onVisibleColumnsChange: () => {},
};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    ...LightTheme.args,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

import { StoryFn, Meta } from "@storybook/react";
import { RowDensity } from "./RowDensity";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { RouterDecorator } from "@shared/config/storybook/RouterDecorator/RouterDecorator";
import { StoreDecorator } from "@shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "shared/RowDensity",
    component: RowDensity,
    decorators: [RouterDecorator, StoreDecorator()],
} as Meta<typeof RowDensity>;

const Template: StoryFn<typeof RowDensity> = () => <RowDensity />;

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK)];

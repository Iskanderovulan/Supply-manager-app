import { StoryFn, Meta } from "@storybook/react";
import { ChartBar } from "./ChartBar";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { TFunction } from "i18next";

export default {
    title: "entities/ChartBar",
    component: ChartBar,
} as Meta<typeof ChartBar>;

const Template: StoryFn<typeof ChartBar> = (args) => <ChartBar {...args} />;

const mockTFunction: TFunction = ((key: string) => key) as TFunction;

export const Light = Template.bind({});
Light.args = {
    data: [
        { label: "Electronics", value: 40 },
        { label: "Books", value: 30 },
        { label: "Furniture", value: 50 },
    ],
    t: mockTFunction,
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

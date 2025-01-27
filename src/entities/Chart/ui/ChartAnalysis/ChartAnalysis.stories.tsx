import { StoryFn, Meta } from "@storybook/react";
import { ChartAnalysis } from "./ChartAnalysis";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { TFunction } from "i18next";

export default {
    title: "entities/ChartAnalysis",
    component: ChartAnalysis,
} as Meta<typeof ChartAnalysis>;

const Template: StoryFn<typeof ChartAnalysis> = (args) => <ChartAnalysis {...args} />;

const mockTFunction: TFunction = ((key: string) => key) as TFunction;

export const Light = Template.bind({});
Light.args = {
    stats: {
        colors: 10,
        materials: 20,
        packs: 15,
        products: 55,
        total: 100,
    },
    categories: [
        { category: "Electronics", count: 30 },
        { category: "Books", count: 20 },
        { category: "Furniture", count: 50 },
    ],
    t: mockTFunction,
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

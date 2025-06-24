import { StoryFn, Meta } from "@storybook/react";
import { ChartProgress } from "./ChartProgress";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { TFunction } from "i18next";
import { Stats, Category } from "@entities/chart/model/chartSchema";

export default {
    title: "entities/ChartProgress",
    component: ChartProgress,
} as Meta<typeof ChartProgress>;

const Template: StoryFn<typeof ChartProgress> = (args) => <ChartProgress {...args} />;

const mockTFunction: TFunction = ((key: string) => key) as TFunction;

const stats: Stats = {
    colors: 10,
    materials: 15,
    packs: 20,
    products: 30,
    total: 75,
};

const categories: Category[] = [
    { category: "Colors", count: 10 },
    { category: "Materials", count: 15 },
    { category: "Packs", count: 20 },
];

export const Light = Template.bind({});
Light.args = {
    stats,
    categories,
    t: mockTFunction,
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

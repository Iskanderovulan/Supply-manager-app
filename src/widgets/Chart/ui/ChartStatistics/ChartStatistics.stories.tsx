import { StoryFn, Meta } from "@storybook/react";
import { ChartStatistics } from "./ChartStatistics";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { Stats } from "@entities/chart/model/chartSchema";
import { TFunction } from "i18next";

export default {
    title: "entities/ChartStatistics",
    component: ChartStatistics,
} as Meta<typeof ChartStatistics>;

const Template: StoryFn<typeof ChartStatistics> = (args) => <ChartStatistics {...args} />;

const mockTFunction: TFunction = ((key: string) => key) as TFunction;

const stats: Stats = {
    colors: 10,
    materials: 15,
    packs: 20,
    products: 30,
    total: 75,
};

export const Light = Template.bind({});
Light.args = {
    stats,
    t: mockTFunction,
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

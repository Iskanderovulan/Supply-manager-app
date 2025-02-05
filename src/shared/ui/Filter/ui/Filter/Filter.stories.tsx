import { StoryFn, Meta } from "@storybook/react";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { Filter } from "./Filter";
import { FilterType, FilterConfig } from "../../model/types/filterConfig";

export default {
    title: "shared/Filter",
    component: Filter,
} as Meta<typeof Filter>;

const filtersConfig: FilterConfig[] = [
    {
        key: "category",
        label: "Category",
        type: FilterType.Checkbox,
        options: [
            { label: "Electronics", value: "electronics" },
            { label: "Books", value: "books" },
            { label: "Clothing", value: "clothing" },
        ],
    },
    {
        key: "price",
        label: "Price",
        type: FilterType.Range,
        min: 0,
        max: 1000,
    },
];

const Template: StoryFn<typeof Filter> = (args) => <Filter {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    filters: filtersConfig,
    onApply: (selectedFilters) => console.log("Applied Filters:", selectedFilters),
    onReset: () => console.log("Filters reset"),
    initialFilters: {
        category: ["electronics"],
        price: [100, 500],
    },
};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    ...LightTheme.args,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

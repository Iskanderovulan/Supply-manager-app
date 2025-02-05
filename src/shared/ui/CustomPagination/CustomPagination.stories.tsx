import { StoryFn, Meta } from "@storybook/react";
import { CustomPagination, CustomPaginationProps } from "./CustomPagination";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "shared/CustomPagination",
    component: CustomPagination,
} as Meta<typeof CustomPagination>;

const Template: StoryFn<CustomPaginationProps> = (args) => <CustomPagination {...args} />;

export const LightTheme = Template.bind({});
LightTheme.args = {
    totalResults: 100,
    currentPage: 1,
    pageSize: 10,
    onPageChange: (page, limit) => {
        console.log(`Page changed to: ${page}, Limit: ${limit}`);
    },
};
LightTheme.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    ...LightTheme.args,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

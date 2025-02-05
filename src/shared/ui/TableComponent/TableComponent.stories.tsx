import { StoryFn, Meta } from "@storybook/react";
import { TableComponent } from "./TableComponent";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";

export default {
    title: "shared/TableComponent",
    component: TableComponent,
} as Meta<typeof TableComponent>;

const Template: StoryFn<typeof TableComponent> = (args) => <TableComponent {...args} />;

export const Light = Template.bind({});
Light.args = {
    columns: [
        { title: "Material Name", dataIndex: "materialName", key: "materialName" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ],
    dataSource: [
        { key: "1", materialName: "Steel", category: "Metals" },
        { key: "2", materialName: "Plastic", category: "Polymers" },
        { key: "3", materialName: "Wood", category: "Natural" },
    ],
    emptyMessage: "No materials available",
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    ...Light.args,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

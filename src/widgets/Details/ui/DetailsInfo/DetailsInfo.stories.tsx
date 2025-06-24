import { StoryFn, Meta } from "@storybook/react";
import { DetailsInfo } from "./DetailsInfo";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { RouterDecorator } from "@shared/config/storybook/RouterDecorator/RouterDecorator";
import { ProductSchema } from "@entities/product";

export default {
    title: "entities/DetailsInfo",
    component: DetailsInfo,
    decorators: [RouterDecorator],
} as Meta<typeof DetailsInfo>;

const Template: StoryFn<typeof DetailsInfo> = (args) => <DetailsInfo {...args} />;

const mockMaterial = {
    id: "material1",
    name: "Steel",
    hardness: 7,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-05T00:00:00.000Z",
};

const mockColor = {
    id: "color1",
    name: "Red",
    intensity: 8,
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-06T00:00:00.000Z",
};

const mockPack = {
    id: "pack1",
    name: "Box",
    type: 2,
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-01-07T00:00:00.000Z",
};

const mockProduct: ProductSchema = {
    id: "product1",
    name: "Sample Product",
    description: "This is a detailed description of the sample product.",
    price: 150,
    material: mockMaterial,
    color: mockColor,
    pack: mockPack,
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-10T00:00:00.000Z",
};

export const Light = Template.bind({});
Light.args = {
    product: mockProduct,
};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    product: mockProduct,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

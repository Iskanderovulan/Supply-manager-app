import { StoryFn, Meta } from "@storybook/react";
import { Navbar } from "./Navbar";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { StoreDecorator } from "@shared/config/storybook/StoreDecorator/StoreDecorator";
import { CollapseProviderDecorator } from "@shared/config/storybook/CollapseProviderDecorator/CollapseProviderDecorator";

export default {
    title: "widgets/Navbar",
    component: Navbar,
    decorators: [CollapseProviderDecorator(false)],
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = () => <Navbar />;
const storeProps = {
    auth: {
        isAuthenticated: true,
        token: "dummyToken",
        refreshToken: "dummyRefreshToken",
        rememberMe: true,
    },
};

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator(storeProps)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(storeProps)];

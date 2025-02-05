import { StoryFn, Meta } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { CollapseProviderDecorator } from "@shared/config/storybook/CollapseProviderDecorator/CollapseProviderDecorator";
import { Theme } from "@shared/types/theme";
import { StoreDecorator } from "@shared/config/storybook/StoreDecorator/StoreDecorator";
import { RouterDecorator } from "@shared/config/storybook/RouterDecorator/RouterDecorator";

const storePropsAuthenticated = {
    auth: {
        token: "dummyToken",
        refreshToken: "dummyRefreshToken",
        isAuthenticated: true,
        rememberMe: true,
    },
};

const storePropsGuest = {
    auth: {
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        rememberMe: false,
    },
};

export default {
    title: "widgets/Sidebar",
    component: Sidebar,
    decorators: [CollapseProviderDecorator(false), RouterDecorator],
} as Meta<typeof Sidebar>;

const Template: StoryFn<typeof Sidebar> = () => <Sidebar />;

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator(storePropsAuthenticated)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(storePropsAuthenticated)];

export const CollapsedLight = Template.bind({});
CollapsedLight.decorators = [
    ThemeDecorator(Theme.LIGHT),
    CollapseProviderDecorator(true),
    StoreDecorator(storePropsAuthenticated),
];

export const CollapsedDark = Template.bind({});
CollapsedDark.decorators = [
    ThemeDecorator(Theme.DARK),
    CollapseProviderDecorator(true),
    StoreDecorator(storePropsAuthenticated),
];

export const GuestLight = Template.bind({});
GuestLight.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator(storePropsGuest)];

export const GuestDark = Template.bind({});
GuestDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(storePropsGuest)];

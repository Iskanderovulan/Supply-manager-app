import { StoryFn, Meta } from "@storybook/react";
import { Logout } from "./Logout";
import { ThemeDecorator } from "@shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@shared/types/theme";
import { StoreDecorator } from "@shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "features/Logout",
    component: Logout,
} as Meta<typeof Logout>;

const Template: StoryFn<typeof Logout> = (args) => <Logout {...args} />;

export const Light = Template.bind({});
const storeProps = {
    auth: {
        token: "dummyToken",
        refreshToken: "dummyRefreshToken",
        isAuthenticated: true,
        rememberMe: true,
    },
};
Light.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator(storeProps)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(storeProps)];

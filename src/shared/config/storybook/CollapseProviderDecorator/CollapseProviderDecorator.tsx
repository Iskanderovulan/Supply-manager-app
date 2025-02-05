import { CollapseProvider } from "@app/providers/CollapseProvider";

export const CollapseProviderDecorator = (initialCollapsed: boolean) => {
    const Decorator = (Story: () => JSX.Element) => (
        <CollapseProvider initialCollapsed={initialCollapsed}>
            <Story />
        </CollapseProvider>
    );

    Decorator.displayName = "CollapseProviderDecorator";
    return Decorator;
};

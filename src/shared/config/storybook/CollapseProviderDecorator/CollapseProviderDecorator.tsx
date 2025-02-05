import { CollapseProvider } from "@app/providers/CollapseProvider";

export const CollapseProviderDecorator =
    (initialCollapsed: boolean) => (Story: () => JSX.Element) => (
        <CollapseProvider initialCollapsed={initialCollapsed}>
            <Story />
        </CollapseProvider>
    );

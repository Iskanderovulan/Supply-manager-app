import { MemoryRouter } from "react-router-dom";

export const RouterDecorator = (Story: () => JSX.Element) => (
    <MemoryRouter>
        <Story />
    </MemoryRouter>
);

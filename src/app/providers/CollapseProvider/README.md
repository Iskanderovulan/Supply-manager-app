## CollapseProvider

### Description

`CollapseProvider` is a React context provider that manages the collapsed state of a UI component (e.g., a sidebar). The state persists in `localStorage`, ensuring that user preferences are retained across sessions.

### Public API

#### Components

-   **`CollapseProvider`** - Wraps child components and provides them with collapse state and a toggle function.

#### Hooks

-   **`useCollapsed`** - A custom hook to access the collapsed state and toggle function within components.

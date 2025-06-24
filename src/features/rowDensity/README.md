## RowDensity

### Description

`RowDensity` provides an option to adjust the spacing between table rows dynamically. It allows users to choose between different row densities, improving the table's readability and adaptability to user preferences.

### Public API

#### Components

-   **`RowDensity`** - A dropdown component that allows users to adjust the row spacing in tables.

#### Selectors

-   **`selectSpacing`** - Retrieves the current row spacing setting from the store.

#### Reducers

-   **`spacingReducer`** - Manages the row density state, storing user preferences in localStorage.

#### Constants

-   **`spacingOptions`** - Defines available row density options (`condensed`, `regular`, `relaxed`).

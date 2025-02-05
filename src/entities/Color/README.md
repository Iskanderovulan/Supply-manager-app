## Color

### Description

`Color` manages color-related data, including filtering, creation, updating, deletion, and exporting color details.

### Public API

#### Components

-   **`ColorCreate`** - A modal for creating a new color entry.
-   **`ColorTable`** - Displays a table of colors with filtering and actions.
-   **`ColorFilter`** - Provides filtering options for colors.
-   **`ColorCrumb`** - Breadcrumb navigation for the color page.
-   **`ColorExcel`** - Enables exporting color data to Excel.

#### Hooks

-   **`useColorData`** - Processes color-related API responses.
-   **`useColorFilters`** - Manages filter parameters for colors.
-   **`useGetColorsQuery`** - Fetches color data from the API.

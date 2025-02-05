## Material

### Description

`Material` manages material-related data, including filtering, creation, updating, deletion, and exporting material details.

### Public API

#### Components

-   **`MaterialCreate`** - A modal for creating a new material entry.
-   **`MaterialTable`** - Displays a table of materials with filtering and actions.
-   **`MaterialFilter`** - Provides filtering options for materials.
-   **`MaterialCrumb`** - Breadcrumb navigation for the material page.
-   **`MaterialExcel`** - Enables exporting material data to Excel.

#### Hooks

-   **`useMaterialData`** - Processes material-related API responses.
-   **`useMaterialFilters`** - Manages filter parameters for materials.
-   **`useGetMaterialsQuery`** - Fetches material data from the API.

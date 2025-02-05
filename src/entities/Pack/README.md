## Pack

### Description

`Pack` manages pack-related data, including filtering, creation, updating, deletion, and exporting pack details.

### Public API

#### Components

-   **`PackCreate`** - A modal for creating a new pack entry.
-   **`PackTable`** - Displays a table of packs with filtering and actions.
-   **`PackFilter`** - Provides filtering options for packs.
-   **`PackCrumb`** - Breadcrumb navigation for the pack page.
-   **`PackExcel`** - Enables exporting pack data to Excel.

#### Hooks

-   **`usePackData`** - Processes pack-related API responses.
-   **`usePackFilters`** - Manages filter parameters for packs.
-   **`useGetPacksQuery`** - Fetches pack data from the API.

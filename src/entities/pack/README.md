## Pack

### Description

`Pack` provides RTK Query API hooks, types, and a selector for working with pack data responses.

### Public API

#### API

-   **`useGetPacksQuery`** — Fetches pack data from the API (`getPacksApi`).
-   **`useCreatePackMutation`** — Creates a new pack (`createPackApi`).
-   **`useUpdatePackMutation`** — Updates an existing pack (`updatePackApi`).
-   **`useDeletePackMutation`** — Deletes a pack (`deletePackApi`).

#### Selectors

-   **`usePackData`** — Extracts `totalPages`, `totalResults`, and `results` from `PackResponse`.

#### Types

-   **`PackSchema`** — Defines a pack entity with relevant fields.

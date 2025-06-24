## Material

### Description

`Material` provides RTK Query API hooks, types, and a selector for working with material data responses.

### Public API

#### API

-   **`useGetMaterialsQuery`** — Fetches material data from the API (`getMaterialsApi`).
-   **`useCreateMaterialMutation`** — Creates a new material (`createMaterialApi`).
-   **`useUpdateMaterialMutation`** — Updates an existing material (`updateMaterialApi`).
-   **`useDeleteMaterialMutation`** — Deletes a material (`deleteMaterialApi`).

#### Selectors

-   **`useMaterialData`** — Extracts `totalPages`, `totalResults`, and `results` from `MaterialResponse`.

#### Types

-   **`MaterialSchema`** — Defines a material entity with common fields.

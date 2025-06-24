## Color

### Description

`Color` provides RTK Query API hooks, types, and a selector for working with color data responses.

### Public API

#### API

-   **`useGetColorsQuery`** — Fetches color data from the API (`getColorsApi`).
-   **`useCreateColorMutation`** — Creates a new color (`createColorApi`).
-   **`useUpdateColorMutation`** — Updates an existing color (`updateColorApi`).
-   **`useDeleteColorMutation`** — Deletes a color (`deleteColorApi`).

#### Selectors

-   **`useColorData`** — Extracts `totalPages`, `totalResults`, and `results` from `ColorResponse`.

#### Types

-   **`ColorSchema`** — Defines a color entity with `intensity` and common fields.

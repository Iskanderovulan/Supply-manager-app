## Product

### Description

`Product` manages product-related data, including listing, filtering, creation, updating, deletion, and exporting product details. It also handles related classifications such as materials, colors, and packs.

### Public API

#### API

-   **`useGetProductsQuery`** — Fetches a list of products (`getProductsApi`).
-   **`useGetDetailsQuery`** — Fetches detailed product information (`detailsApi`).
-   **`useCreateProductMutation`** — Creates a new product (`createProductApi`).
-   **`useUpdateProductMutation`** — Updates an existing product (`updateProductApi`).
-   **`useDeleteProductMutation`** — Deletes a product (`deleteProductApi`).

#### Selectors

-   **`useProductData`** — Extracts `totalPages`, `totalResults`, and `results` from `ProductResponse`.

#### Types

-   **`ProductSchema`** — Defines the structure of a product, including its description, price, and associated classifications (material, color, pack).

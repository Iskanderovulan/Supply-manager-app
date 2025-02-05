## Product

### Description

`Product` manages product-related data, including filtering, creation, updating, deletion, and exporting product details. It also handles classifications such as materials, colors, and packs.

### Public API

#### Components

-   **`ProductCreate`** - A modal for creating a new product entry.
-   **`ProductsTable`** - Displays a table of products with filtering and actions.
-   **`ProductFilter`** - Provides filtering options for products.
-   **`ProductCrumb`** - Breadcrumb navigation for the product page.
-   **`ProductExcel`** - Enables exporting product data to Excel.

#### Hooks

-   **`useGetProductsQuery`** - Fetches product data from the API.
-   **`useClassificators`** - Retrieves available classifications (materials, colors, and packs) for product filtering.
-   **`useProductFilters`** - Manages filter parameters for products.
-   **`useProductData`** - Processes product-related API responses.

#### Types

-   **`ProductSchema`** - Defines the structure of a product, including its description, price, and associated classifications (material, color, pack).

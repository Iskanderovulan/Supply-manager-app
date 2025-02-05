## AppRouter

### Description

`AppRouter` is the main routing component of the application. It defines all available routes, manages route protection, and provides layout handling through `AppLayout`.

### Public API

#### Components

-   **`AppRouter`** - Manages application routes and handles protected and public paths.
-   **`AppLayout`** - Defines the global layout structure, including `Navbar` and `Sidebar`.

#### Features

-   Implements protected routes via `ProtectedRoute`.
-   Uses `Suspense` for lazy loading pages.
-   Redirects unauthorized users to the login page.
-   Displays a `NotFoundPage` for invalid routes.

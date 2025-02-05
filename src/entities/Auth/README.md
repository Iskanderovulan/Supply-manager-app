## Auth

### Description

`Auth` provides authentication management, including user login, token storage, and logout handling. It supports session-based and local storage authentication with an optional "Remember Me" feature.

### Public API

#### Reducers

-   **`authReducer`** - Handles authentication state, including token management and user authentication status.

#### Actions

-   **`authActions.setCredentials`** - Stores access and refresh tokens, managing persistence based on the "Remember Me" setting.
-   **`authActions.clearToken`** - Clears authentication tokens from storage and resets the authentication state.
-   **`authActions.setRememberMe`** - Toggles the "Remember Me" feature for persistent login.

#### Selectors

-   **`selectAuthToken`** - Retrieves the authentication token from the state.
-   **`selectRefreshToken`** - Retrieves the refresh token from the state.
-   **`selectIsAuthenticated`** - Determines whether the user is authenticated.

#### Hooks

-   **`useLogoutEffect`** - Handles logout logic by resetting the authentication state and clearing API cache when the user logs out.

### Types

-   **`AuthSchema`** - Defines the authentication state structure.
-   **`RememberMeSchema`** - Manages the "Remember Me" functionality.
-   **`UserData`** - Represents user authentication data, including tokens.

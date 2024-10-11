import { RootState } from "app/store/store";

export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

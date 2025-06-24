import { RootState } from "@app/store/store";

export const selectAuthToken = (state: RootState) => state.auth?.token ?? null;

export const selectRefreshToken = (state: RootState) => state.auth?.refreshToken ?? null;

export const selectIsAuthenticated = (state: RootState) => state.auth?.isAuthenticated ?? false;

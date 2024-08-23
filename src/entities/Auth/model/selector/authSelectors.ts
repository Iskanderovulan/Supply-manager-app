import { RootState } from "app/store/store";

export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

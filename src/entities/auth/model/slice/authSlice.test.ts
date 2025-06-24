import { describe, it, expect } from "vitest";
import { authReducer, authActions } from "./authSlice";
import {
    LOCAL_STORAGE_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@shared/const/localstorage";
import {
    SESSION_STORAGE_TOKEN_KEY,
    SESSION_STORAGE_REFRESH_TOKEN_KEY,
} from "@shared/const/sessionstorage";
import { mockLocalStorage } from "@shared/lib/tests/mockLocalStorage";

global.localStorage = mockLocalStorage;
global.sessionStorage = mockLocalStorage;

describe("authSlice", () => {
    const initialState = {
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        rememberMe: false,
    };

    it("should handle setCredentials and save tokens in localStorage when rememberMe is true", () => {
        const tokens = {
            access: { token: "access-token", expires: "" },
            refresh: { token: "refresh-token", expires: "" },
        };

        const prevState = { ...initialState, rememberMe: true };
        const newState = authReducer(prevState, authActions.setCredentials({ tokens }));

        expect(newState.token).toBe(tokens.access.token);
        expect(newState.refreshToken).toBe(tokens.refresh.token);
        expect(newState.isAuthenticated).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            LOCAL_STORAGE_TOKEN_KEY,
            tokens.access.token,
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            LOCAL_STORAGE_REFRESH_TOKEN_KEY,
            tokens.refresh.token,
        );
        expect(sessionStorage.removeItem).toHaveBeenCalledWith(SESSION_STORAGE_TOKEN_KEY);
        expect(sessionStorage.removeItem).toHaveBeenCalledWith(SESSION_STORAGE_REFRESH_TOKEN_KEY);
    });

    it("should handle setCredentials and save tokens in sessionStorage when rememberMe is false", () => {
        const tokens = {
            access: { token: "access-token", expires: "" },
            refresh: { token: "refresh-token", expires: "" },
        };

        const prevState = { ...initialState, rememberMe: false };
        const newState = authReducer(prevState, authActions.setCredentials({ tokens }));

        expect(newState.token).toBe(tokens.access.token);
        expect(newState.refreshToken).toBe(tokens.refresh.token);
        expect(newState.isAuthenticated).toBe(true);
        expect(sessionStorage.setItem).toHaveBeenCalledWith(
            SESSION_STORAGE_TOKEN_KEY,
            tokens.access.token,
        );
        expect(sessionStorage.setItem).toHaveBeenCalledWith(
            SESSION_STORAGE_REFRESH_TOKEN_KEY,
            tokens.refresh.token,
        );
        expect(localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_TOKEN_KEY);
        expect(localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    });

    it("should handle clearToken and remove tokens from localStorage when rememberMe is true", () => {
        const prevState = {
            ...initialState,
            token: "access-token",
            refreshToken: "refresh-token",
            isAuthenticated: true,
            rememberMe: true,
        };

        const newState = authReducer(prevState, authActions.clearToken());

        expect(newState.token).toBeNull();
        expect(newState.refreshToken).toBeNull();
        expect(newState.isAuthenticated).toBe(false);
        expect(localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_TOKEN_KEY);
        expect(localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    });

    it("should handle setRememberMe", () => {
        const newState = authReducer(initialState, authActions.setRememberMe(true));
        expect(newState.rememberMe).toBe(true);
    });
});

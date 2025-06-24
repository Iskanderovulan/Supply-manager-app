import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authSchema";
import { Tokens } from "@shared/types/auth";
import {
    LOCAL_STORAGE_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@shared/const/localstorage";
import {
    SESSION_STORAGE_TOKEN_KEY,
    SESSION_STORAGE_REFRESH_TOKEN_KEY,
} from "@shared/const/sessionstorage";

const initialState: AuthSchema = {
    token:
        localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ||
        sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY),
    refreshToken:
        localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY) ||
        sessionStorage.getItem(SESSION_STORAGE_REFRESH_TOKEN_KEY),
    isAuthenticated: !!(
        localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ||
        sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)
    ),
    rememberMe: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ tokens: Tokens }>) => {
            const { tokens } = action.payload;

            state.token = tokens.access.token;
            state.refreshToken = tokens.refresh.token;
            state.isAuthenticated = true;

            if (state.rememberMe) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, tokens.access.token);
                localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refresh.token);
                sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
                sessionStorage.removeItem(SESSION_STORAGE_REFRESH_TOKEN_KEY);
            } else {
                sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, tokens.access.token);
                sessionStorage.setItem(SESSION_STORAGE_REFRESH_TOKEN_KEY, tokens.refresh.token);
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
            }
        },

        clearToken: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            if (state.rememberMe) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
                localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
            } else {
                sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY);
                sessionStorage.removeItem(SESSION_STORAGE_REFRESH_TOKEN_KEY);
            }
            state.rememberMe = false;
        },

        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
        },
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;

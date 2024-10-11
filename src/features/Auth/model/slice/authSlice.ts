import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authSchema";
import { Tokens } from "@shared/types/auth";
import {
    LOCAL_STORAGE_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@shared/const/localstorage";

const initialState: AuthSchema = {
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY),
    isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ tokens: Tokens }>) => {
            state.token = action.payload.tokens.access.token;
            state.refreshToken = action.payload.tokens.refresh.token;
            state.isAuthenticated = true;
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload.tokens.access.token);
            localStorage.setItem(
                LOCAL_STORAGE_REFRESH_TOKEN_KEY,
                action.payload.tokens.refresh.token,
            );
        },

        clearToken: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        },
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;

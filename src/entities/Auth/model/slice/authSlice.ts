import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authSchema";
import { Tokens, User } from "shared/types/auth";
import {
    LOCAL_STORAGE_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "shared/const/localstorage";

const initialState: AuthSchema = {
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY),
    isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ tokens: Tokens; user: User }>) => {
            state.token = action.payload.tokens.access.token;
            state.refreshToken = action.payload.tokens.refresh.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
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
            state.user = null;
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        },
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;

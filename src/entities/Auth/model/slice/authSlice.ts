import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authSchema";

const initialState: AuthSchema = {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;

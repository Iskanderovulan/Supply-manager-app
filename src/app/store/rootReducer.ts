// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "entities/Auth";
import { baseApi } from "shared/api/rtkApi";
import { authApi } from "shared/api/authApi";

export const rootReducer = combineReducers({
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

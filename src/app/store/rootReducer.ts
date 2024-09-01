// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "entities/Auth";
import { baseApi } from "shared/api/rtkApi";

export const rootReducer = combineReducers({
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

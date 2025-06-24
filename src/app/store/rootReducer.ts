import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@entities/auth";
import { baseApi } from "@shared/api/rtkApi";
import { authApi } from "@shared/api/authApi";
import { spacingReducer } from "@features/rowDensity";

export const rootReducer = combineReducers({
    auth: authReducer,
    spacing: spacingReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

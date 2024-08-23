// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "src/entities/Auth";

export const rootReducer = combineReducers({
    auth: authReducer,
});

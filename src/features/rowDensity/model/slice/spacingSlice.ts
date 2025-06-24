import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_SPACING_KEY } from "@shared/const/localstorage";
import { spacingOptions } from "../../const/spacingOptions";

interface SpacingState {
    spacing: number;
}

const initialState: SpacingState = {
    spacing: parseInt(localStorage.getItem(LOCAL_STORAGE_SPACING_KEY) || spacingOptions[1].key),
};

const spacingSlice = createSlice({
    name: "spacing",
    initialState,
    reducers: {
        setSpacing: (state, action: PayloadAction<number>) => {
            state.spacing = action.payload;
            localStorage.setItem(LOCAL_STORAGE_SPACING_KEY, action.payload.toString());
        },
    },
});

export const { actions: spacingActions } = spacingSlice;
export const { reducer: spacingReducer } = spacingSlice;

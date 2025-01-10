import { describe, it, expect } from "vitest";
import { spacingReducer, spacingActions } from "./spacingSlice";
import { LOCAL_STORAGE_SPACING_KEY } from "@shared/const/localstorage";
import { mockLocalStorage } from "@shared/lib/tests/mockLocalStorage";

global.localStorage = mockLocalStorage;

const createInitialState = () => ({
    spacing: parseInt(localStorage.getItem(LOCAL_STORAGE_SPACING_KEY) || "58"),
});

describe("spacingSlice", () => {
    it("should return the initial state", () => {
        const state = spacingReducer(createInitialState(), { type: "unknown" });
        expect(state).toEqual({ spacing: 58 });
    });

    it("should handle setSpacing action", () => {
        const newSpacing = 74;
        const action = spacingActions.setSpacing(newSpacing);
        const state = spacingReducer({ spacing: 58 }, action);

        expect(state.spacing).toBe(newSpacing);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            LOCAL_STORAGE_SPACING_KEY,
            newSpacing.toString(),
        );
    });

    it("should initialize spacing from localStorage", () => {
        mockLocalStorage.setItem(LOCAL_STORAGE_SPACING_KEY, "90");
        const initialState = createInitialState();
        const state = spacingReducer(initialState, { type: "unknown" });
        expect(state.spacing).toBe(90);
    });
});

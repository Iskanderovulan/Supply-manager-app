import { describe, it, expect } from "vitest";
import { selectAuthToken, selectRefreshToken, selectIsAuthenticated } from "./authSelectors";
import { RootState } from "@app/store/store";
const mockState = {
    auth: {
        token: "mock-access-token",
        refreshToken: "mock-refresh-token",
        isAuthenticated: true,
    },
};

const mockRootState = mockState as unknown as RootState;

describe("authSelectors", () => {
    it("should select the auth token", () => {
        const token = selectAuthToken(mockRootState);
        expect(token).toBe("mock-access-token");
    });

    it("should select the refresh token", () => {
        const refreshToken = selectRefreshToken(mockRootState);
        expect(refreshToken).toBe("mock-refresh-token");
    });

    it("should select the isAuthenticated flag", () => {
        const isAuthenticated = selectIsAuthenticated(mockRootState);
        expect(isAuthenticated).toBe(true);
    });

    it("should return null if auth state is missing", () => {
        const state = {} as RootState;
        expect(selectAuthToken(state)).toBeNull();
        expect(selectRefreshToken(state)).toBeNull();
        expect(selectIsAuthenticated(state)).toBe(false);
    });
});

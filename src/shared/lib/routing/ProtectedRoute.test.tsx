import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAppSelector } from "@shared/lib/hooks/useAppSelector";
import { describe, it, vi, expect } from "vitest";

vi.mock("@shared/lib/hooks/useAppSelector", () => ({
    useAppSelector: vi.fn(),
}));

describe("ProtectedRoute", () => {
    it("renders children if user is authenticated", () => {
        vi.mocked(useAppSelector).mockReturnValue(true);

        const { getByText } = render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <div>Protected Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>,
        );

        expect(getByText("Protected Content")).toBeInTheDocument();
    });

    it("redirects to /login if user is not authenticated", () => {
        vi.mocked(useAppSelector).mockReturnValue(false);

        const { container } = render(
            <MemoryRouter initialEntries={["/protected"]}>
                <Routes>
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <div>Protected Content</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        expect(container.textContent).toBe("Login Page");
    });

    it("redirects to / if user is authenticated and reverseRedirect is true", () => {
        vi.mocked(useAppSelector).mockReturnValue(true);

        const { container } = render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute reverseRedirect>
                                <div>Login Page</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        expect(container.textContent).toBe("Home Page");
    });

    it("renders children if user is not authenticated and reverseRedirect is true", () => {
        vi.mocked(useAppSelector).mockReturnValue(false);

        const { getByText } = render(
            <MemoryRouter initialEntries={["/login"]}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute reverseRedirect>
                                <div>Login Page</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>,
        );

        expect(getByText("Login Page")).toBeInTheDocument();
    });
});

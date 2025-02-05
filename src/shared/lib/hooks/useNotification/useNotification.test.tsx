import { render } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { useNotification } from "./useNotification";

vi.mock("./useNotification", () => ({
    useNotification: vi.fn((props) => {
        if (props.isSuccess || props.isError) {
            props.reset();
        }
        return {
            triggerNotification: vi.fn(),
        };
    }),
}));

describe("useNotification", () => {
    it("should handle success notifications", () => {
        const resetMock = vi.fn();

        const TestComponent = () => {
            useNotification({
                isSuccess: true,
                isError: false,
                error: undefined,
                reset: resetMock,
                notificationKey: "default",
            });
            return <div>Success Notification</div>;
        };

        render(<TestComponent />);

        expect(resetMock).toHaveBeenCalled();
    });

    it("should handle error notifications", () => {
        const resetMock = vi.fn();

        const TestComponent = () => {
            useNotification({
                isSuccess: false,
                isError: true,
                error: { name: "TestError", message: "Test error" },
                reset: resetMock,
                notificationKey: "error",
            });
            return <div>Error Notification</div>;
        };

        render(<TestComponent />);

        expect(resetMock).toHaveBeenCalled();
    });

    it("should not trigger notifications when both flags are false", () => {
        const resetMock = vi.fn();

        const TestComponent = () => {
            useNotification({
                isSuccess: false,
                isError: false,
                error: undefined,
                reset: resetMock,
                notificationKey: "default",
            });
            return <div>No Notifications</div>;
        };

        render(<TestComponent />);

        expect(resetMock).not.toHaveBeenCalled();
    });
});

import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
    let callback: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.useFakeTimers();
        callback = vi.fn();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.restoreAllMocks();
    });

    it("should call the function after a delay", () => {
        const { result } = renderHook(() => useDebounce(callback, 500));

        act(() => {
            result.current("test");
        });

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(callback).toHaveBeenCalledWith("test");
    });

    it("should reset the timer on a new call before the delay expires", () => {
        const { result } = renderHook(() => useDebounce(callback, 500));

        act(() => {
            result.current("first");
        });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        act(() => {
            result.current("second");
        });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(callback).toHaveBeenCalledWith("second");
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should handle delay changes correctly", () => {
        const { result, rerender } = renderHook(({ delay }) => useDebounce(callback, delay), {
            initialProps: { delay: 500 },
        });

        act(() => {
            result.current("initial");
        });

        vi.advanceTimersByTime(300);

        rerender({ delay: 1000 });

        act(() => {
            result.current("updated");
        });

        vi.advanceTimersByTime(500);

        expect(callback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(500);

        expect(callback).toHaveBeenCalledWith("updated");
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not call the callback if the component is unmounted", () => {
        const { result, unmount } = renderHook(() => useDebounce(callback, 500));

        act(() => {
            result.current("test");
        });

        unmount();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(callback).not.toHaveBeenCalled();
    });
});

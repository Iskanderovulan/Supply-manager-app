import { vi } from "vitest";

export const mockLocalStorage = {
    store: {} as Record<string, string>,
    getItem: vi.fn((key: string) => mockLocalStorage.store?.[key] || null),
    setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage.store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
        if (mockLocalStorage.store) {
            delete mockLocalStorage.store[key];
        }
    }),
    clear: vi.fn(() => {
        mockLocalStorage.store = {};
    }),
    get length() {
        return Object.keys(this.store || {}).length;
    },
    key: vi.fn((index: number) => {
        const keys = Object.keys((this as any).store);
        return keys[index] || null;
    }),
};

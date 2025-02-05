import { TFunction } from "i18next";
import { vi } from "vitest";

export const mockT: TFunction = vi.fn((key: string) => key) as unknown as TFunction;

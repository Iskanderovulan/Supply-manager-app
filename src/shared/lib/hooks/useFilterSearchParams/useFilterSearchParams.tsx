import { useSearchParams } from "react-router-dom";

type UpdateSearchParams = Record<string, string | number | (string | number)[] | undefined | null>;
export type UpdateSearchParamsFunc = (
    updates: UpdateSearchParams,
    options?: { replace?: boolean },
) => void;

interface UseFilterSearchParamsReturn {
    getSearchParam(paramKey: string): string;
    getSearchParam(paramKey: string, isArray: true): string[];
    updateSearchParams: UpdateSearchParamsFunc;
}

export function useFilterSearchParams(): UseFilterSearchParamsReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    // Перегрузка функции для возврата либо строки, либо массива строк
    function getSearchParam(paramKey: string): string;
    function getSearchParam(paramKey: string, isArray: true): string[];

    function getSearchParam(paramKey: string, isArray = false): string | string[] {
        if (isArray) {
            return searchParams.getAll(paramKey);
        }
        return searchParams.get(paramKey) || "";
    }

    const updateSearchParams = (updates: UpdateSearchParams, { replace = false } = {}): void => {
        if (typeof updates !== "object" || updates === null) {
            console.error("Updates should be a non-null object");
            return;
        }

        const newSearchParams = new URLSearchParams(searchParams);

        Object.keys(updates).forEach((key) => {
            const value = updates[key];
            if (Array.isArray(value)) {
                newSearchParams.delete(key); // Удаляем старые значения ключа
                value.forEach((v) => {
                    newSearchParams.append(key, String(v)); // Добавляем новые значения
                });
            } else if (value !== undefined && value !== null) {
                newSearchParams.set(key, String(value));
            } else {
                newSearchParams.delete(key);
            }
        });

        setSearchParams(newSearchParams, { replace });
    };

    return { getSearchParam, updateSearchParams };
}

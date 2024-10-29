import { useSearchParams } from "react-router-dom";

type UpdateSearchParams = Record<string, string | number | (string | number)[] | undefined | null>;
export type UpdateSearchParamsType = (
    updates: UpdateSearchParams,
    options?: { replace?: boolean },
) => void;

interface UseFilterSearchParamsReturn {
    getSearchParam(paramKey: string): string;
    getSearchParam(paramKey: string, isArray: true): string[];
    updateSearchParams: UpdateSearchParamsType;
}

export function useFilterSearchParams(): UseFilterSearchParamsReturn {
    const [searchParams, setSearchParams] = useSearchParams();

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

        // Если updates пустой, создаем пустой URLSearchParams для очистки всех параметров
        if (Object.keys(updates).length === 0) {
            setSearchParams(new URLSearchParams(), { replace });
            return;
        }

        const newSearchParams = new URLSearchParams(searchParams);

        Object.keys(updates).forEach((key) => {
            const value = updates[key];
            if (Array.isArray(value)) {
                newSearchParams.delete(key);
                value.forEach((v) => {
                    newSearchParams.append(key, String(v));
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

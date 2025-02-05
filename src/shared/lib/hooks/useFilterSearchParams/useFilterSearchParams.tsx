import { useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// type UpdateSearchParams = Record<string, string | number | (string | number)[] | undefined | null>;
type UpdateSearchParams = Record<string, unknown>;

export type UpdateSearchParamsType = (
    updates: UpdateSearchParams,
    options?: { replace?: boolean },
) => void;

interface UseFilterSearchParamsReturn {
    getSearchParam(paramKey: string): string;
    getSearchParam(paramKey: string, isArray: true): string[];
    updateSearchParams: UpdateSearchParamsType;
    getDecodedParam(paramKey: string): string;
}

export function useFilterSearchParams(): UseFilterSearchParamsReturn {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamsRef = useRef(searchParams);
    const setSearchParamsRef = useRef(setSearchParams);

    useEffect(() => {
        searchParamsRef.current = searchParams;
    }, [searchParams]);

    useEffect(() => {
        setSearchParamsRef.current = setSearchParams;
    }, [setSearchParams]);

    function getSearchParam(paramKey: string): string;
    function getSearchParam(paramKey: string, isArray: true): string[];
    function getSearchParam(paramKey: string, isArray = false): string | string[] {
        return isArray ? searchParams.getAll(paramKey) : searchParams.get(paramKey) || "";
    }

    function getDecodedParam(paramKey: string): string {
        return decodeURIComponent(searchParams.get(paramKey) || "");
    }

    const updateSearchParams = useCallback(
        (updates: UpdateSearchParams, { replace = true } = {}): void => {
            if (typeof updates !== "object" || updates === null) {
                console.error("Updates should be a non-null object");
                return;
            }

            if (Object.keys(updates).length === 0) {
                setSearchParamsRef.current(new URLSearchParams(), { replace });
                return;
            }

            const newSearchParams = new URLSearchParams(searchParamsRef.current);

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

            setSearchParamsRef.current(newSearchParams, { replace });
        },
        [],
    );

    return { getSearchParam, updateSearchParams, getDecodedParam };
}

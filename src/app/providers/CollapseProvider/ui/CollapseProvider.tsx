import { FC, useState, ReactNode, useEffect } from "react";
import { CollapseContext } from "../lib/collapseContext";
import { LOCAL_STORAGE_COLLAPSED_KEY } from "@shared/const/localstorage";

interface CollapseProviderProps {
    children: ReactNode;
    initialCollapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
}

export const CollapseProvider: FC<CollapseProviderProps> = ({
    children,
    initialCollapsed,
    onToggle,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(
        () => initialCollapsed ?? localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY) === "true",
    );

    const toggleCollapse = () => {
        setCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem(LOCAL_STORAGE_COLLAPSED_KEY, String(newState));
            onToggle?.(newState);
            return newState;
        });
    };

    useEffect(() => {
        if (initialCollapsed !== undefined) {
            setCollapsed(initialCollapsed);
        }
    }, [initialCollapsed]);

    return (
        <CollapseContext.Provider value={{ collapsed, toggleCollapse }}>
            {children}
        </CollapseContext.Provider>
    );
};

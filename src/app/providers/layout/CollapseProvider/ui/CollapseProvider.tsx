import { FC, useState, ReactNode } from "react";
import { CollapseContext } from "../lib/collapseContext";
import { LOCAL_STORAGE_COLLAPSED_KEY } from "@shared/const/localstorage";

interface CollapseProviderProps {
    children: ReactNode;
}

export const CollapseProvider: FC<CollapseProviderProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(
        () => localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY) === "true",
    );

    const toggleCollapse = () => {
        setCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem(LOCAL_STORAGE_COLLAPSED_KEY, String(newState));
            return newState;
        });
    };
    return (
        <CollapseContext.Provider value={{ collapsed, toggleCollapse }}>
            {children}
        </CollapseContext.Provider>
    );
};

import { FC } from "react";
import { useState, ReactNode, useCallback } from "react";
import { CollapseContext } from "../lib/collapseContext";

interface CollapseProviderProps {
    children: ReactNode;
}

export const CollapseProvider: FC<CollapseProviderProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, []);

    return (
        <CollapseContext.Provider value={{ collapsed, toggleCollapse }}>
            {children}
        </CollapseContext.Provider>
    );
};
